import javax.naming.*;
import javax.sql.*;
import java.sql.*;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DBTest extends HttpServlet
{

    String foo = "Not Connected";
    int bar = -1;
	ResultSet rst;
    
    public void init()
	{
    }

	public void doGet(HttpServletRequest request, //Tutorial from https://www.tutorialspoint.com/servlets/servlets-database-access.htm
					  HttpServletResponse response)
				throws ServletException, IOException
	{
	
		// Set response content type
		response.setContentType("text/html");
	
		PrintWriter out = response.getWriter();
		
		//Formatting content and header for HTML page
		String docType =
			"<!doctype html public \"-//w3c//dtd html 4.0 " +
			 "transitional//en\">\n";
			
			out.println(docType +
			"<html>\n" +
			"<head><title>" + "Database Result" + "</title></head>\n" + 
			"<body bgcolor=\"#f0f0f0\">\n" + //Formatting
			"<h1 align=\"center\">" + "Database Result:" + "</h1>\n"); //Formatting on top of page
		
		
		// Set response content type
		response.setContentType("text/html");

		// Actual logic goes here; build HTML with database results
		out.print("<table width=400 cellspacing=1 cellpadding=5 border=1>"); //Result Table start

		try // Documentation https://jdbc.postgresql.org/documentation/94/tomcat.html
        {
            Context ctx = new InitialContext();
            if(ctx == null )
                throw new Exception("Boom - No Context");
    
            // /jdbc/postgres is the name of the resource above 
            DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/postgres");
        
            if (ds != null) 
            {
                Connection conn = ds.getConnection();
                if(conn != null) 
                {
                    //foo = "Got Connection "+conn.toString();
                    Statement stmt = conn.createStatement(); 
                    rst = stmt.executeQuery("select * from contrs.contacts"); //contains query results
                    ResultSetMetaData rstm = rst.getMetaData(); //Contains details like row count and column names for auto populating and creating table
					int numOfCols = rstm.getColumnCount();
					
					for ( int i=1; i<numOfCols+1; i++ ) {
						out.print("<td><b>" + rstm.getColumnName(i) +
						"</b></td>");
					}
					
					while (rst.next()) {
							out.print("<tr>");
							for ( int i=1; i<numOfCols+1; i++ ) {
									out.print("<td>" + rst.getString(i) + "</td>");
							}
							out.print("</tr>");
					}
                    conn.close();
                }
            }
        }
        catch(Exception e) //error handling
        {
            e.printStackTrace();
        }
		
		//Closing html page formatting
		out.print("</table>");
		
		out.println("</body><html>"); 
	}
}
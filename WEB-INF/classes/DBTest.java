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
    
    public void init() // code from https://jdbc.postgresql.org/documentation/94/tomcat.html
	{
        try
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
                    foo = "Got Connection "+conn.toString();
                    Statement stmt = conn.createStatement();
                    rst = stmt.executeQuery("select cont_id, cont_first_name, cont_last_name from contrs.contacts");
                    
                    if(rst.next())
                    {
                        foo= rst.getString(2);
                        bar= rst.getInt(3);
                    }
                    conn.close();
                }
            }
        }
        catch(Exception e) 
        {
            e.printStackTrace();
        }
    }

	public void doGet(HttpServletRequest request, //some code from https://www.tutorialspoint.com/servlets/servlets-database-access.htm
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
			"<body bgcolor=\"#f0f0f0\">\n" +
			"<h1 align=\"center\">" + "Database Result: " + "</h1>\n");
		
		// Set response content type
		response.setContentType("text/html");

		// Actual logic goes here; build HTML with database results
		//PrintWriter out = response.getWriter();
		try{
			//Extract data from result set (RST)
			while(rst.next()){
				//Retrieve by column name
				out.println("<div>Result:<ul>");
				out.println("<li>" + rst.getInt("cont_id") + "</li>");
				out.println("<li>" + rst.getString("cont_first_name") + "</li>");
				out.println("<li>" + rst.getString("cont_last_name") + "</li>");
				out.println("</ul></div>");
			}
		}catch(SQLException se){
			//Handle errors for JDBC
			se.printStackTrace();
		}catch(Exception e){
			//Handle errors for Class.forName
			e.printStackTrace();
      }
		
		out.println("</body><html>"); 
	}
	
    public String getFoo() { return foo; }

    public int getBar() { return bar;}
}
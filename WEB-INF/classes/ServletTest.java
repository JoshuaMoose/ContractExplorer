//import java.io.BufferedReader;
//import java.io.IOException;
import java.io.*;

import java.util.List;
import java.util.ArrayList;

import javax.servlet.*; //find specifics later
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import javax.naming.*;
import javax.sql.*;
import java.sql.*; 
 
import com.google.gson.Gson;
 
public class ServletTest extends HttpServlet {
 
	String connectionStatus = "Not Connected"; //Placeholder string to be used to validate connection
	ResultSet rst; //stores the restult of the database query
 
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
				
		List<Contact> ContactList = new ArrayList<Contact>();
		
		
		try // Documentation https://jdbc.postgresql.org/documentation/94/tomcat.html
        {
            //attempt to connect to the database
			Context ctx = new InitialContext();
            if(ctx == null )
                throw new Exception("Boom - No Context");
    
            // /jdbc/postgres is the name of the resource above 
            DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/postgres");
        
            if (ds != null) //datasourse exists
            {
                Connection conn = ds.getConnection(); //gets connection from datasource
                if(conn != null) 
                {
                    //connectionStatus = "Got Connection "+conn.toString(); //show connection status/details
                    Statement stmt = conn.createStatement(); 
                    rst = stmt.executeQuery("select * from contrs.contacts"); //contains query Contact
                    
					while (rst.next()) { //while there are Contact, print them to the restults table.
						ContactList.add(new Contact(rst.getString("cont_id"), rst.getString("cont_first_name"), rst.getString("cont_last_name"))); //add a new contact to the list 
					}
                    conn.close();
                }
            }
        }
        catch(Exception e) //error handling
        {
            e.printStackTrace();
        }
		
		PrintWriter out = response.getWriter();
		String jsonString = new Gson().toJson(ContactList);
		
		out.println(jsonString);
    }
 
}

class Contact { //Contact object which stores instances of contacts
	
	private String cont_id;
	private String cont_first_name;
	private String cont_last_name;
	
	public Contact(String cont_id, String cont_first_name, String cont_last_name) {
		this.cont_id = cont_id;
		this.cont_first_name = cont_first_name;
		this.cont_last_name = cont_last_name;
	}
	
}
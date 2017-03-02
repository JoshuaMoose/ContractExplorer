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
						ContactList.add(new Contact(rst.getString("cont_id"), 
													rst.getString("cont_org_id"),
													rst.getString("cont_role_cd"),
													rst.getString("cont_first_name"),
													rst.getString("cont_middle_name"),
													rst.getString("cont_last_name"),
													rst.getString("cont_name_title"),
													rst.getString("cont_name_suffix"),
													rst.getString("cont_addr1"),
													rst.getString("cont_addr2"),
													rst.getString("cont_city"),
													rst.getString("cont_state_prov_cd"),
													rst.getString("cont_post_cd"),
													rst.getString("cont_cntry_cd"),
													rst.getString("cont_office_phone"),
													rst.getString("cont_mobile_phone"),
													rst.getString("cont_home_phone"),
													rst.getString("cont_email"),
													rst.getString("cont_alt_email"))); //add a new contact to the list 
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
	
	//string items that hold database results
	private String cont_id;
	private String cont_org_id;
	private String cont_role_cd;
	private String cont_first_name;
	private String cont_middle_name;
	private String cont_last_name;
	private String cont_name_title;
	private String cont_name_suffix;
	private String cont_addr1;
	private String cont_addr2;
	private String cont_city;
	private String cont_state_prov_cd;
	private String cont_post_cd;
	private String cont_cntry_cd;
	private String cont_office_phone;
	private String cont_mobile_phone;
	private String cont_home_phone;
	private String cont_email;
	private String cont_alt_email;
	
	
	public Contact(String cont_id, 
				String cont_org_id,
				String cont_role_cd,
				String cont_first_name,
				String cont_middle_name,
				String cont_last_name,
				String cont_name_title,
				String cont_name_suffix,
				String cont_addr1,
				String cont_addr2,
				String cont_city,
				String cont_state_prov_cd,
				String cont_post_cd,
				String cont_cntry_cd,
				String cont_office_phone,
				String cont_mobile_phone,
				String cont_home_phone,
				String cont_email,
				String cont_alt_email) 
	{
		this.cont_id = cont_id;
		this.cont_org_id = cont_org_id;
		this.cont_role_cd = cont_role_cd;
		this.cont_first_name = cont_first_name;
		this.cont_middle_name = cont_middle_name;
		this.cont_last_name = cont_last_name;
		this.cont_name_title = cont_name_title;
		this.cont_name_suffix = cont_name_suffix;
		this.cont_addr1 = cont_addr1;
		this.cont_addr2 = cont_addr2;
		this.cont_city = cont_city;
		this.cont_state_prov_cd = cont_state_prov_cd;
		this.cont_post_cd = cont_post_cd;
		this.cont_cntry_cd = cont_cntry_cd;
		this.cont_office_phone = cont_office_phone;
		this.cont_mobile_phone = cont_mobile_phone;
		this.cont_home_phone = cont_home_phone;
		this.cont_email = cont_email;
		this.cont_alt_email = cont_alt_email;	
	}
	
}
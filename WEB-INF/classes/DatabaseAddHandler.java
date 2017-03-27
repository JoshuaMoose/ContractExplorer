import java.io.*;
import java.io.BufferedReader;

import java.util.*;
//import java.util.ArrayList;

import javax.servlet.*; //find specifics later
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import javax.naming.*;
import javax.sql.*;
import java.sql.*; 
 
import com.google.gson.*;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
 
public class DatabaseAddHandler extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		
		List addNames = new ArrayList();
		
		System.out.println("Post request made to DatabaseAddHandler.");
		
		StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
		String requestData = sb.toString();
		
		JsonObject jsonRequestObject = new Gson().fromJson(requestData, JsonObject.class);
		
		String insertTable = "INSERT INTO contrs." + jsonRequestObject.get("table").getAsString() + " (";
		String insertValue = "VALUES (";
		
		System.out.println("Made it past string creation.");
		
		
		Set<Map.Entry<String, JsonElement>> entries = jsonRequestObject.entrySet();//will return members of your object
		
		for (Map.Entry<String, JsonElement> entry: entries) {
			//System.out.println(entry.getKey());
			addNames.add(entry.getKey().toString());
		}
		
		
		/*System.out.println("INSERT INTO contrs." + jsonRequestObject.get("table").getAsString() +
												" (cont_org_id,cont_role_cd,cont_first_name,cont_middle_name," + 
												"cont_last_name,cont_name_title,cont_name_suffix,cont_addr1,cont_addr2," +
												"cont_city,cont_state_prov_cd,cont_post_cd,cont_cntry_cd,cont_office_phone," +
												"cont_mobile_phone,cont_home_phone,cont_email,cont_alt_email) VALUES (" +
												jsonRequestObject.get("cont_id").getAsString() + ", " +
												jsonRequestObject.get("cont_org_id").getAsString() + ", '" +
												jsonRequestObject.get("cont_role_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_first_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_middle_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_last_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_name_title").getAsString() + "', '" +
												jsonRequestObject.get("cont_name_suffix").getAsString() + "', '" +
												jsonRequestObject.get("cont_addr1").getAsString() + "', '" +
												jsonRequestObject.get("cont_addr2").getAsString() + "', '" +
												jsonRequestObject.get("cont_city").getAsString() + "', '" +
												jsonRequestObject.get("cont_state_prov_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_post_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_cntry_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_office_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_mobile_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_home_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_email").getAsString() + "', '" +
												jsonRequestObject.get("cont_alt_email").getAsString() + "')"); */
		
		/*///// Build insert string; don't add what we don't have //////
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
		{
			insertTable = insertTable + "cont_id,";
			insertValue = insertValue + jsonRequestObject.get("cont_id").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_org_id,";
			insertValue = insertValue + jsonRequestObject.get("cont_org_id").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_role_cd,";
			insertValue = insertValue + jsonRequestObject.get("cont_role_cd").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_first_name,";
			insertValue = insertValue + jsonRequestObject.get("cont_first_name").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_middle_name,";
			insertValue = insertValue + jsonRequestObject.get("cont_middle_name").getAsString() + ", ";
		}
		
		if ( !(jsonRequestObject.get("cont_last_name").getAsString()).equals("") ) {
			insertTable = insertTable + "cont_last_name,";
			insertValue = insertValue + jsonRequestObject.get("cont_last_name").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_name_title,";
			insertValue = insertValue + jsonRequestObject.get("cont_name_title").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_name_suffix,";
			insertValue = insertValue + jsonRequestObject.get("cont_name_suffix").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_addr1,";
			insertValue = insertValue + jsonRequestObject.get("cont_addr1").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_addr2,";
			insertValue = insertValue + jsonRequestObject.get("cont_addr2").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_city,";
			insertValue = insertValue + jsonRequestObject.get("cont_city").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_state_prov_cd,";
			insertValue = insertValue + jsonRequestObject.get("cont_state_prov_cd").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_post_cd,";
			insertValue = insertValue + jsonRequestObject.get("cont_post_cd").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_cntry_cd,";
			insertValue = insertValue + jsonRequestObject.get("cont_cntry_cd").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_office_phone,";
			insertValue = insertValue + jsonRequestObject.get("cont_office_phone").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_mobile_phone,";
			insertValue = insertValue + jsonRequestObject.get("cont_mobile_phone").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_") != null) && (jsonRequestObject.get("cont_").getAsString().length() != 0)) 
			insertTable = insertTable + "cont_home_phone,";
			insertValue = insertValue + jsonRequestObject.get("cont_home_phone").getAsString() + ", ";
		}
		
		if ( (jsonRequestObject.get("cont_alt_email") != null) && (jsonRequestObject.get("cont_alt_email").getAsString().length() != 0)) 
		{
			insertTable = insertTable + "cont_email,";
			insertValue = insertValue + jsonRequestObject.get("cont_email").getAsString() + ", ";
		} */
		
		if ( (jsonRequestObject.get("cont_alt_email") != null) && (jsonRequestObject.get("cont_alt_email").getAsString().length() != 0)) 
		{
			insertTable = insertTable + "cont_alt_email";
			insertValue = jsonRequestObject.get("cont_alt_email").getAsString();
		} 

		insertTable = insertTable + ") ";
		insertValue = insertValue + ")";
		//end insert building 
		System.out.println(insertTable + insertValue + "What?");
		
		
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
					/*stmt.execute("INSERT INTO contrs." + jsonRequestObject.get("table").getAsString() +
												" (cont_id,cont_org_id,cont_role_cd,cont_first_name,cont_middle_name," + 
												"cont_last_name,cont_name_title,cont_name_suffix,cont_addr1,cont_addr2," +
												"cont_city,cont_state_prov_cd,cont_post_cd,cont_cntry_cd,cont_office_phone," +
												"cont_mobile_phone,cont_home_phone,cont_email,cont_alt_email) VALUES (" +
												jsonRequestObject.get("cont_id").getAsString() + ", " +
												jsonRequestObject.get("cont_org_id").getAsString() + ", '" +
												jsonRequestObject.get("cont_role_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_first_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_middle_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_last_name").getAsString() + "', '" +
												jsonRequestObject.get("cont_name_title").getAsString() + "', '" +
												jsonRequestObject.get("cont_name_suffix").getAsString() + "', '" +
												jsonRequestObject.get("cont_addr1").getAsString() + "', '" +
												jsonRequestObject.get("cont_addr2").getAsString() + "', '" +
												jsonRequestObject.get("cont_city").getAsString() + "', '" +
												jsonRequestObject.get("cont_state_prov_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_post_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_cntry_cd").getAsString() + "', '" +
												jsonRequestObject.get("cont_office_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_mobile_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_home_phone").getAsString() + "', '" +
												jsonRequestObject.get("cont_email").getAsString() + "', '" +
												jsonRequestObject.get("cont_alt_email").getAsString() + "')"); */
												
					conn.close();
				}
			}
		}
        catch(Exception e) //error handling
        {
            e.printStackTrace();
        }
	}

}
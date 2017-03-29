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
 
public class DatabaseEditHandler extends HttpServlet {

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
		
		String updateTable = "UPDATE contrs." + jsonRequestObject.get("table").getAsString();
		String updateSet = " SET (";
		String updateWhere = " WHERE (";
		
		System.out.println("Made it past string creation.");
		
		JsonObject original = jsonRequestObject.getAsJsonObject("original");
		JsonObject updated = jsonRequestObject.getAsJsonObject("updated");
		
		Set<Map.Entry<String, JsonElement>> entries = original.entrySet();//will return members of your object
		
		for (Map.Entry<String, JsonElement> entry: entries) {
			//System.out.println(entry.getKey());
			addNames.add(entry.getKey().toString());
		}
		
		for (int i = 1; i < addNames.size(); i++) {
			//System.out.println(addNames.get(i));
			updateTable = updateTable + addNames.get(i);
			
			if ( isNumeric(jsonRequestObject.get(addNames.get(i).toString()).getAsString()) ) 
			{
				updateSet = updateSet + updated.get(addNames.get(i).toString()).getAsString();
				updateWhere = updateWhere + "'" + original.get(addNames.get(i).toString()).getAsString() + "'";
			} 
			else {
				updateSet = updateSet + "'" + updated.get(addNames.get(i).toString()).getAsString() + "'";
				updateWhere = updateWhere + "'" + original.get(addNames.get(i).toString()).getAsString() + "'"; 
			}
			
			if ( i < (addNames.size() - 1) ) {
				updateTable = updateTable + ", ";
				updateSet = updateSet + ", ";
				updateWhere = updateWhere + "' ";
			}
		}

		updateTable = updateTable + ") ";
		updateSet = updateSet + ") ";
		updateWhere = updateWhere + ");";
		//end insert building
		
		System.out.println("Insert Attempted: " + updateTable + updateSet + updateWhere);
		
		
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
					
					//stmt.execute(updateTable + updateSet + updateWhere);
												
					conn.close();
				}
			}
		}
        catch(Exception e) //error handling
        {
            e.printStackTrace();
        }
	}
	
	public boolean isNumeric(String s) 
	{  
		return s.matches("[-+]?\\d*\\.?\\d+");  
	}  


}
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
		
		//System.out.println("Post request made to DatabaseAddHandler."); //Console Logging
		
		
		//Get json request object from the webpage
		StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
		String requestData = sb.toString();
		
		JsonObject jsonRequestObject = new Gson().fromJson(requestData, JsonObject.class); //parse the json as a string to a json object
		
		
		//Format for the table to insert in to data and the values to be inserted (to be combined upon SQL execution)
		String insertTable = "INSERT INTO contrs." + jsonRequestObject.get("table").getAsString() + " (";
		String insertValue = "VALUES (";
		
		//Mapping to retrieve the keys/names of the json elements which correspond to the column names for the database
		Set<Map.Entry<String, JsonElement>> entries = jsonRequestObject.entrySet();
		
		for (Map.Entry<String, JsonElement> entry: entries) { //loop through map, get the keys/names
			//System.out.println(entry.getKey());
			addNames.add(entry.getKey().toString()); //add the keys/names to a list
		}
		
		
		//loop through to create the sql insert statement
		for (int i = 1; i < addNames.size(); i++) {
			//System.out.println(addNames.get(i));
			insertTable = insertTable + addNames.get(i);
			
			if ( isNumeric(jsonRequestObject.get(addNames.get(i).toString()).getAsString()) ) // check if the insert value is numeric for INSERT purposes
			{
				insertValue = insertValue + jsonRequestObject.get(addNames.get(i).toString()).getAsString();
			} 
			else {
				insertValue = insertValue + "'" + jsonRequestObject.get(addNames.get(i).toString()).getAsString() + "'"; //add quotes to indicate strings for INSERT
			}
			
			if ( i < (addNames.size() - 1) ) { //commas after all but last element
				insertTable = insertTable + ", ";
				insertValue = insertValue + ", ";
			}
		}

		//closing formatting for two parts of string 
		insertTable = insertTable + ") ";
		insertValue = insertValue + ");";
		
		//end INSERT building
		
		//System.out.println("Insert Attempted: " + insertTable + insertValue); //console logging
		
		
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
					
					stmt.execute(insertTable + insertValue); //execute insert
												
					conn.close();
				}
			}
		}
        catch(Exception e) //error handling
        {
            e.printStackTrace();
        }
	}
	
	public boolean isNumeric(String s) //basic check to see if a string can be parsed to a number 
	{  
		return s.matches("[-+]?\\d*\\.?\\d+");  
	}  


}
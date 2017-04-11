import java.io.*;
import java.io.BufferedReader;

import java.lang.Integer;

import java.util.*;
//import java.util.ArrayList;

import javax.servlet.*;
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
 
public class DatabaseUpdateHandler extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		
		//Get json-formatted request object from the webpage
		StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
		String requestData = sb.toString();
		//End request builder
		
		//Variable Declarations
		JsonObject jsonRequestObject = new Gson().fromJson(requestData, JsonObject.class);
		JsonObject original = jsonRequestObject.getAsJsonObject("original");
		JsonObject updated = jsonRequestObject.getAsJsonObject("updated");
		JsonObject types = jsonRequestObject.getAsJsonObject("types");
		
		List<String> addNamesOriginal = new ArrayList<String>();
		List<String> addNamesUpdated = new ArrayList<String>();
		
		Set<Map.Entry<String, JsonElement>> entriesUpdated = updated.entrySet();//will return members of your object
		
		//Mapping to retrieve the keys/names of the json elements which correspond to the column names for the database
		for (Map.Entry<String, JsonElement> entry: entriesUpdated) {
			addNamesUpdated.add(entry.getKey().toString());
		}
		
		Set<Map.Entry<String, JsonElement>> entriesOriginal = original.entrySet();//will return members of your object
		
		System.out.println(types.get("cont_id").getAsString());
		
		for (Map.Entry<String, JsonElement> entry: entriesOriginal) {
			//System.out.println(entry.getKey());
			addNamesOriginal.add(entry.getKey().toString());
		}
		
		//Format for update SQL (to be combined upon SQL execution)
		String updateTable = "UPDATE contrs." + jsonRequestObject.get("table").getAsString();
		String updateSet = " SET ";
		String updateWhere = " WHERE ";
		
		//Temp variables in statement building
		String value = new String();
		String dataType = new String();
		String columnName = new String();
		int prepIndex = 1;
		
		
		////// Insert Building //////
		
		//loop through to create the sql insert statement (using placeholder ? values to be changed in PreparedStatement)
		for (int i = 0; i < addNamesUpdated.size(); i++) {
			
			columnName =  addNamesUpdated.get(i);
			
			updateSet = updateSet + columnName + " = ? ";
				
			if ( i < (addNamesUpdated.size() - 1) ) {
				updateSet = updateSet + ", ";
			}
		}
		
		//loop through to create the sql insert statement (using placeholder ? values to be changed in PreparedStatement)
		for (int i = 0; i < addNamesOriginal.size(); i++) {
						
			columnName =  addNamesOriginal.get(i);
			
			updateWhere = updateWhere + columnName + " = ? ";
				
			if ( i < (addNamesOriginal.size() - 1) ) {
				updateWhere = updateWhere + " AND ";
			}
		}
		
		updateWhere = updateWhere + ";";
		
		///// end insert building //////
		
		//System.out.println("Insert Attempted: " + updateTable + updateSet + updateWhere);
		
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
					//Use a prepared statement: avoids injection issues and escape characters
					PreparedStatement stmt = conn.prepareStatement( updateTable + updateSet + updateWhere ); 
					
					//Loop through prepared statement and replace values where appropriate
					for (int i = 0; i < addNamesUpdated.size(); i++ ) {
						
						//Placeholder assignment
						columnName =  addNamesUpdated.get(i);
						value = updated.get(columnName).getAsString();
						dataType = types.get(columnName).getAsString();
						
						//Handle different data types
						switch( dataType ) {
							case "String" :
								stmt.setString(prepIndex, value);
								break;
								
							case "Boolean" :
								if ( ( value ).equals("t") ) {
									stmt.setBoolean(prepIndex, true);
								} else {
									stmt.setBoolean(prepIndex, false);
								}								
								break;
								
							case "Integer" :
								stmt.setInt(i+1, Integer.parseInt(value));
								break;
						}
						
						prepIndex++;
					}
					
					//Loop through prepared statement and replace values where appropriate
					for (int i = 0; i < addNamesOriginal.size(); i++ ) {
						
						//Placeholder assignment
						columnName =  addNamesOriginal.get(i);
						value = original.get(columnName).getAsString();
						dataType = types.get(columnName).getAsString();
						
						//Handle different data types
						switch( dataType ) {
							case "String" :
								stmt.setString(prepIndex, value);
								break;
								
							case "Boolean" :
								if ( ( value ).equals("t") ) {
									stmt.setBoolean(prepIndex, true);
								} else {
									stmt.setBoolean(prepIndex, false);
								}								
								break;
								
							case "Integer" :
								stmt.setInt(prepIndex, Integer.parseInt(value));
								break;
								
							case "TimeStamp":
								Timestamp timeStamp = Timestamp.valueOf(value);
								stmt.setTimestamp(prepIndex, timeStamp);
								break;
						}
						
						prepIndex++;
					}
					
					stmt.executeUpdate();
												
					conn.close();
				}
			}
		}
        catch(Exception e) //error handling
        {
            e.printStackTrace(); // Default -- to be changed later
        }
	}

}
//import java.io.BufferedReader;
//import java.io.IOException;
import java.io.*;
import java.io.BufferedReader;

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
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
 
public class DatabaseSearchHandler extends HttpServlet {
 
	String connectionStatus = "Not Connected"; //Placeholder string to be used to validate connection
	ResultSet rst; //stores the restult of the database query
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		
		////// This code block reads the request data sent with the post request and parses it to a JSON object to read //////
		List<String> columnNames = new ArrayList<String>();
		List<JsonObject> resultList = new ArrayList<JsonObject>();
		
		// Get the request data as a string
		StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        
		while ((str = br.readLine()) != null) {
            sb.append(str);
        }
		String requestData = sb.toString();

		// Convert the request data string to a JSON object so we can read it
		JsonObject jsonRequestObject = new Gson().fromJson(requestData, JsonObject.class);
		//Read the relevant data (table for this servlet)
		String tableName = jsonRequestObject.get("table").getAsString();
		
		System.out.println("Table to be Queried: " + tableName); //Log query to console
		
		////// End parsing block //////
		
		
		
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
                    
					/////// This code block will fetch database results using only table name passed in from get request ////////
					
					Statement stmt = conn.createStatement(); 
                    rst = stmt.executeQuery("select * from contrs." + tableName); //contains query Contact
                    
					ResultSetMetaData rstm = rst.getMetaData(); //Contains details like row count and column names for auto populating and creating table
					int numOfColumns = rstm.getColumnCount(); //metadata from table to know how to build dynamically
					
					for(int i=1;i<=numOfColumns;i++) {
						columnNames.add(rstm.getColumnName(i)); //loop through to get all column names
					}
					
			        while(rst.next()) { // convert each object to an human readable JSON object
						JsonObject jsonObject = new JsonObject();
						
						for(int i=1; i<=numOfColumns; i++) {
							//Get column name and associated value for this result
							String key = columnNames.get(i - 1);
							String value = rst.getString(i);
							
							jsonObject.addProperty(key, value); //Add a json element in format key: value -- ie. cont_first_name: Bill
						}
						
						resultList.add(jsonObject);
					}		
					
                    conn.close();
					
					/////// End database fetch ////////
                }
            }
        }
        catch(Exception e) //error handling
        {
            e.printStackTrace(); // Default -- to be changed later
        }
		
		// Send results back to frontend
		PrintWriter out = response.getWriter();
		String jsonString = new Gson().toJson(resultList);
		
		out.println(jsonString);
    }
 
}
import static com.mongodb.client.model.Filters.eq;
import static spark.Spark.*;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import org.bson.BSONObject;
import org.bson.BsonDocument;
import org.bson.Document;
import com.google.gson.Gson;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import java.util.ArrayList;

class Message {
    public String message;
}

public class Main {

    public static ArrayList<String> users = new ArrayList<>();

    public static void main(String[] args) {

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        // get ref to database
        MongoDatabase db = mongoClient.getDatabase("Project413");
        // get ref to collection
        MongoCollection<Document> roomscollection = db.getCollection("Rooms");
        MongoCollection<Document> usercollection = db.getCollection("users");
        final Gson gson = new GsonBuilder().setPrettyPrinting().create();;
        webSocket("/ws", WebSocketHandler.class);
        port(6969);

        post("/register", (req, res) -> {

            System.out.println(">>>" + req.body());
            String input = req.body();
            String delims = "[\\\"\\\":{}]+";
            String[] tokens = input.split(delims);

            for(String m : tokens){
                System.out.println(">>"+m);
            }

            String username = tokens[2];
            String password = tokens[5];

            Document doc = new Document("username", username)
                    .append("password", password);
            usercollection  .insertOne(doc);

            return "OK";
        }, gson::toJson);

        post("/login", (req, res) -> {

            String input = req.body();
            String delims = "[\\\"\\\":{}]+";
            String[] tokens = input.split(delims);
            String username = tokens[2];
            String password = tokens[5];

            MongoCursor<Document> cursor = usercollection.find().iterator();

            boolean isLoggedIn = false;

            while(cursor.hasNext()) {
                String x = cursor.next().toString();
                System.out.println(x);
                String[] arrOfStr = x.split("[, ={}]+", 10);
                int i = 0;
                System.out.println(arrOfStr[4]);
                System.out.println(arrOfStr[6]);
                for (String a : arrOfStr) {
                    if(arrOfStr[4].equalsIgnoreCase(username) && arrOfStr[6].equals(password)) {
                        isLoggedIn = true;
                    }
                }
            }
            if(isLoggedIn) return "IS_LOGGED_IN";
            else if(!isLoggedIn) return "NOT_LOGGED_IN";
            return "OK";
        }, gson::toJson);
    }

    public static ArrayList<Object> CreateArrayListObj(MongoCursor<Document> cursor) {
        ArrayList<Object> responseArray = new ArrayList<>();
        while(cursor.hasNext()) {
            responseArray.add(cursor.next().toJson());
        }
        return responseArray;
    }
}

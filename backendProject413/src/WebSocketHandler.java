import org.eclipse.jetty.websocket.api.annotations.*;
import org.eclipse.jetty.websocket.api.Session;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.Gson;
import java.util.stream.Collectors;

class JsonObj {
    public String id;
    public String user;
}

@WebSocket
public class WebSocketHandler {
    // Store sessions if you want to, for example, broadcast a message to all users
    static Map<Session, Session> sessionMap = new ConcurrentHashMap<>();

    HashMap<String,Integer> room = new HashMap<String,Integer>();
    // gameStuff has is a hashmap that contains a hashmap as its key(terrible idea that i realized later),
    // and arra char[] as its value,
    // The key is supposed to be the game rooms that contain the players
    // The char[] is contains the current gameroom
    static HashMap<HashMap, char[]> gameStuff = new HashMap<HashMap, char[]>();
    Gson g = new Gson();

    public static void broadcast(String message) {
        sessionMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
            try {
                session.getRemote().sendString(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @OnWebSocketConnect
    public void connected(Session session) {
        System.out.println("A client has connected");

        // when the first person is trying to connect create basic rooms
        if(sessionMap.isEmpty()) {
            char[] board = new char[9];
            HashMap<String,String> roomOne = new HashMap<String,String>(){{
                put("Room", "One");
                put("P1", "");
                put("P2", "");
            }};

            HashMap<String,String> roomTwo = new HashMap<String,String>(){{
                put("Room", "Two");
                put("P1", "");
                put("P2", "");
            }};

            gameStuff.put(roomOne, board);
            gameStuff.put(roomTwo, board);
            iterateGameStuff();
        }

        sessionMap.put(session, session);
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {
        System.out.println("A client has disconnected");
        sessionMap.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        JsonObj jObj = g.fromJson(message, JsonObj.class);
        System.out.println(jObj.id);
        System.out.println(jObj.user);
        String roomId = jObj.id;
        String currentUser = jObj.user;

        // TODO
        // We can Modify what part of the gameStuff obj we want to modify depending on the message coming in.
        // If the message coming in is an Array, we update the game board according to game room
        // Else if its user information( Like they clicked on a room) then we update user basesd on room
        // Need to update P1 or P2 here, based on the rooms
        // After updating P1 and P2, we can pull whatever array the users clicked from the game
        // and copy it overwrite it to this array.
        // Next we can broadcast the array to everybody else.

        iterateGameStuff();
        System.out.println("Got: " + message);   // Print message
        session.getRemote().sendString("A message"); // and send it back
    }

    // this is just to print out gamestuff
    public static void iterateGameStuff() {
        Iterator<HashMap.Entry<HashMap, char[]>> itr = gameStuff.entrySet().iterator();
        while(itr.hasNext()) {
            Map.Entry<HashMap, char[]> entry = itr.next();
            System.out.println("Key = " + entry.getKey() +
                    ", Value = " + entry.getValue()[0]);
        }
    }
}
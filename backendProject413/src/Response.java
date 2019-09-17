import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class Response {
    ArrayList<Object> response;
    Date date;
    String responseCode;
    ArrayList<String> players;

    public static class ResponseBuilder {
        ArrayList<Object> response;
        Date date;
        ArrayList<String> players;

        public ResponseBuilder setResponse(ArrayList<Object> response) {
            this.response = response;
            return this;
        }

        public ResponseBuilder setDate(Date date) {
            return this;
        }

        public ResponseBuilder setPlayer( ArrayList<String> players) {
            this.players = players;
            return this;
        }

        public Response build() {
            return new Response(this);
        }
    }

    private Response(ResponseBuilder builder) {
        response = builder.response;
        date = builder.date;
        players = builder.players;
    }

    @Override
    public String toString() {
        return "Response{" +
                "response=" + response +
                ", date=" + date +
                ", responseCode='" + players + '\'' +
                '}';
    }
}
package edu.simpson.cis320.crud.cis320crud_app;

import edu.simpson.cis320.crud.cis320crud_app.Person;
import edu.simpson.cis320.crud.cis320crud_app.PersonDAO;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@WebServlet(name = "NameListDeleteServlet", value = "/api/name_list_delete")
public class NameListDeleteServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListDeleteServlet.class.getName());
    private Pattern firstNamePattern;

    public NameListDeleteServlet(){
        firstNamePattern = Pattern.compile("^[0-9]*$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "doPost for NameListDeleteServlet");

        response.setContentType("text/JSON");
        PrintWriter out = response.getWriter();

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        Jsonb jsonb = JsonbBuilder.create();
        Person personToDelete = jsonb.fromJson(requestString, Person.class);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Log info as a check
        log.log(Level.INFO, "Object test: " + personToDelete.getId());

        PersonDAO.deletePerson(personToDelete);
        out.println("{\"success\" : \"Successful Deletion\"}");
    }
}
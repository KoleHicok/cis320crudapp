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


@WebServlet(name = "NameListEditServlet", value = "/api/name_list_edit")
public class NameListEditServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEditServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "doPost for NameListEditServlet");

        response.setContentType("text/JSON");
        PrintWriter out = response.getWriter();

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        Jsonb jsonb = JsonbBuilder.create();
        Person personToAdd = jsonb.fromJson(requestString, Person.class);

        // Log info as a check
        log.log(Level.INFO, "Object test: " + personToAdd.getFirst());

        out.println("Object test: "+ personToAdd.getFirst());

        PersonDAO.addPerson(personToAdd);
    }
}
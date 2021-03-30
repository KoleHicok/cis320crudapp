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


@WebServlet(name = "NameListEditServlet", value = "/api/name_list_edit")
public class NameListEditServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(NameListEditServlet.class.getName());
    private Pattern firstNamePattern;
    private Pattern lastNamePattern;
    private Pattern emailPattern;
    private Pattern phonePattern;
    private Pattern birthdayPattern;
    private Pattern idPattern;

    public NameListEditServlet(){
        firstNamePattern = Pattern.compile("^[A-Za-z]'?[-A-Za-zÁÉÍÓÚáéíóúñ]{1,15}$");
        lastNamePattern = Pattern.compile("^[A-Za-z][-'A-Za-zÁÉÍÓÚáéíóúñ]{1,20}$");
        emailPattern = Pattern.compile("^.*@.*$");
        phonePattern = Pattern.compile("^\\(?[0-9]{3}\\)?\\s?-?[0-9]{3}-?[0-9]{4}$");
        birthdayPattern = Pattern.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        log.log(Level.FINE, "doPost for NameListEditServlet");

        response.setContentType("text/JSON");
        PrintWriter out = response.getWriter();

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        Jsonb jsonb = JsonbBuilder.create();
        Person personToAdd = jsonb.fromJson(requestString, Person.class);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        Matcher firstMatcher = firstNamePattern.matcher(personToAdd.getFirst());
        Matcher lastMatcher = lastNamePattern.matcher(personToAdd.getLast());
        Matcher emailMatcher = emailPattern.matcher(personToAdd.getEmail());
        Matcher phoneMatcher = phonePattern.matcher(personToAdd.getPhone());
        Matcher birthdayMatcher = birthdayPattern.matcher(personToAdd.getBirthday());

        log.log(Level.INFO, "Matchers Created");

        if(!firstMatcher.find() || !lastMatcher.find() || !emailMatcher.find() || !phoneMatcher.find() ||
                !birthdayMatcher.find()) {
            log.log(Level.WARNING, "Invalid data passed to backend.");
            out.println("{\"error\" : \"Invalid fields in submission.\"}");
            return;
        }

        // Log info as a check
        log.log(Level.INFO, "Object test: " + personToAdd.getId());

        if(personToAdd.getId() == 0){
            log.log(Level.INFO, "Adding Person");
            PersonDAO.addPerson(personToAdd);
        }
        else{
            log.log(Level.INFO, "Updating Person");
            PersonDAO.updatePerson(personToAdd);
        }

        out.println("{\"success\" : \"Successful Insert\"}");
    }
}
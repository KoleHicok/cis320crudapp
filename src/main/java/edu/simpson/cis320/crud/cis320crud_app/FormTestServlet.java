package edu.simpson.cis320.crud.cis320crud_app;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "FormTestServlet", value = "/api/form_test_servlet")
public class FormTestServlet extends HttpServlet {

    private Pattern fieldnameValidationPattern;

    public FormTestServlet() {
        fieldnameValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a get, not a post
        out.println("Get");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='"+fieldname+"'");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a post
        out.println("Post");

        // Grab the data we got via a parameter
        String fieldname = request.getParameter("fieldname");

        // Just print the data out to confirm we got it.
        out.println("fieldname='"+fieldname+"'");

        Matcher m = fieldnameValidationPattern.matcher(fieldname);
        if (m.find( )) {
            out.println("success");
        } else {
            out.println("error");
        }
    }
}
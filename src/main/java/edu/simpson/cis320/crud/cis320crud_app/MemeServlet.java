package edu.simpson.cis320.crud.cis320crud_app;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "memeServlet", value = "/meme")
public class MemeServlet extends HttpServlet {
    private final static Logger log = Logger.getLogger(MemeServlet.class.getName());

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        log.log(Level.INFO, "Meme servlet");

        ServletContext context = getServletContext();
        InputStream imageStream = context.getResourceAsStream("WEB-INF/classes/memeImage.jpg");
        BufferedImage image = ImageIO.read(imageStream);

        // Modify Image
        // (Pen)
        Graphics g = image.getGraphics();

        // (Font)
        String fontName = "Ariel";
        int fontStyle = Font.BOLD;
        int fontSize = 50;
        Font font = new Font(fontName, fontStyle, fontSize);
        g.setFont(font);

        // Set Color
        Color myColor = new Color(0, 0,0);
        g.setColor(myColor);

        String message = request.getParameter("message");
        if (message == "" || message == null){
            message = "To The Moon";
        }

        g.drawString(message, 50, 60);

        myColor = new Color(0, 255, 0);
        g.setColor(myColor);

        g.drawString(message, 52, 62);

        g.dispose();

        // Hello
        response.setContentType("image/jpg");
        OutputStream out = response.getOutputStream();
        ImageIO.write(image, "JPG", out);
    }
}

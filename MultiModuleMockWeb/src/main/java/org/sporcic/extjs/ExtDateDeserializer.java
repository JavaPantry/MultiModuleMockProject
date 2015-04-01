package org.sporcic.extjs;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * Deserializer to deal with dates coming in via JSON. It recognizes dates
 * in the standard ISO format, like 2010-07-01T15:30:00.
 */
public class ExtDateDeserializer extends JsonDeserializer<Date> {

    private final Logger logger = LoggerFactory.getLogger(ExtDateSerializer.class);

    // the date format to use
    //private final static String FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
    private final static String FORMAT = "yyyy-MM-dd";

    @Override
    public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {

        String val = jsonParser.getText();

        DateFormat formatter = new SimpleDateFormat(FORMAT);
        Date date = null;
        try {
            date = formatter.parse(val);

        } catch(ParseException pex) {
            logger.error("Failed to parse date " + val, pex);
        }

        return date;
    }
}

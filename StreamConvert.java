/*InputStream and OutputStream change

copied from google 
*/

import java.io.ByteArrayInputStream;
 import java.io.ByteArrayOutputStream;
 import java.io.InputStream;
 import java.io.OutputStream;

public  class ConvertUtil {
    //inputStream to outputStream
    public ByteArrayOutputStream parse(InputStream in) throws Exception
    {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
         int ch;
         while ((ch = in.read()) != -1 ) {   
            swapStream.write(ch);   
        }
        return swapStream;
    }
    //outputStream to inputStream
    public ByteArrayInputStream parse(OutputStream out) throws Exception
    {
        ByteArrayOutputStream baos = new    ByteArrayOutputStream();
        baos = (ByteArrayOutputStream) out;
        ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
         return swapStream;
    }
    //inputStream to String
    public String parse_String(InputStream in) throws Exception
    {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
         int ch;
         while ((ch = in.read()) != -1 ) {   
            swapStream.write(ch);   
        }
        return swapStream.toString();
    }
    //OutputStream to String
    public String parse_String(OutputStream out) throws Exception
    {
        ByteArrayOutputStream baos = new    ByteArrayOutputStream();
        baos = (ByteArrayOutputStream) out;
        ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
         return swapStream.toString();
    }
    //String to inputStream
    public ByteArrayInputStream parse_inputStream(String in) throws Exception
    {
        ByteArrayInputStream input = new ByteArrayInputStream(in.getBytes());
         return input;
    }
    //String to outputStream
    public ByteArrayOutputStream parse_outputStream(String in) throws Exception
    {
        return parse(parse_inputStream(in));
    }
}

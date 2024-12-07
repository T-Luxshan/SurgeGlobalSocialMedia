# Use a base image with OpenJDK Java 17 installed
FROM openjdk:17

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/server-0.0.1-SNAPSHOT.jar /app

# Expose the application port
EXPOSE 8080

# Define the default command to run the application
CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]




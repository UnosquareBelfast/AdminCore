FROM openjdk:8
ADD target/hr-manager-service-0.0.1-SNAPSHOT.jar hr-manager-service-0.0.1-SNAPSHOT.jar
EXPOSE 8081
ENTRYPOINT  ["java", "-jar","hr-manager-service-0.0.1-SNAPSHOT.jar"]

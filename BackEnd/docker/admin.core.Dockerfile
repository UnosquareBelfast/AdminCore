FROM maven:3.5-jdk-8 as BUILD
 
COPY src /usr/src/admin-core/src
COPY src/main/resources/application.properties.docker /usr/src/admin-core/src/main/resources/application.properties
COPY pom.xml /usr/src/admin-core
RUN mvn -f /usr/src/admin-core/pom.xml clean package
 
FROM openjdk:8-jre-alpine
# ONBUILD : do initial sql ?
RUN mkdir -p /opt/unosquare/admin-core/standalone/deployments/
COPY --from=BUILD /usr/src/admin-core/target/admin-core-0.0.1-SNAPSHOT.jar /opt/unosquare/admin-core/standalone/deployments/admin-core.jar
EXPOSE 8081
ENTRYPOINT  ["java", "-jar","/opt/unosquare/admin-core/standalone/deployments/admin-core.jar"]
FROM maven:3.5-jdk-8 as BUILD
 
COPY src /usr/src/myapp/src
COPY src/main/resources/application.properties.docker /usr/src/myapp/src/main/resources/application.properties
COPY pom.xml /usr/src/myapp
RUN mvn -f /usr/src/myapp/pom.xml clean package
 
FROM jboss/wildfly:10.1.0.Final
 
COPY --from=BUILD /usr/src/myapp/target/hr-manager-service-0.0.1-SNAPSHOT.jar /opt/jboss/wildfly/standalone/deployments/hr-manager-service.war
EXPOSE 8081
ENTRYPOINT  ["java", "-jar","/opt/jboss/wildfly/standalone/deployments/hr-manager-service.war"]

# docker build -t unosquare/admincore:0.0.2 .
# docker run --rm -ti -e POSTGRES_DB=HrManager -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password --name admincore-postgres postgres
# docker run --name admincore-0-0-2 --link admincore-postgres:postgres --rm -ti -p 8081:8081 unosquare/admincore:0.0.2

# check database -
# docker run --rm -ti --name my-app --link admincore-postgres:postgres -p 8282:8080 adminer

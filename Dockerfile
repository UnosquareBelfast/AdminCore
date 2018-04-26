FROM maven:3.5-jdk-8 as BUILD
 
COPY src /usr/src/myapp/src
COPY src/main/resources/application.properties.docker /usr/src/myapp/src/main/resources/application.properties
COPY pom.xml /usr/src/myapp
RUN mvn -f /usr/src/myapp/pom.xml clean package
 
FROM openjdk:8-jre-alpine
 
COPY --from=BUILD /usr/src/myapp/target/admin-core-0.0.1-SNAPSHOT.jar /opt/jboss/wildfly/standalone/deployments/admin-core.jar
EXPOSE 8081
ENTRYPOINT  ["java", "-jar","/opt/jboss/wildfly/standalone/deployments/admin-core.jar"]

# docker build --rm -t unosquare/admincore:0.0.1 .
# docker run --rm -ti -e POSTGRES_DB=HrManager -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password --name admincore-postgres postgres
# docker run --rm --name admincore-0-0-1 --link admincore-postgres:postgres --rm -ti -p 8081:8081 unosquare/admincore:0.0.1

# check database -
# docker run --rm -ti --name my-app --link admincore-postgres:postgres -p 8282:8080 adminer
# docker run --link admincore-0-0-1:admincore --rm -ti -p 80:80 httpd
# docker run --rm -ti -p 80:80 httpd

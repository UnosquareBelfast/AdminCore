FROM maven:3.5.3-jdk-8 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:8
COPY --from=build /usr/src/app/target/admin-core-0.0.1-SNAPSHOT.jar /usr/app/admin-core-0.0.1-SNAPSHOT.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/usr/app/admin-core-0.0.1-SNAPSHOT.jar"]

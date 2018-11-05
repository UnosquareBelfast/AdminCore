FROM microsoft/dotnet:2.1-sdk AS build-env

WORKDIR /app
COPY . .

RUN dotnet restore && dotnet publish -o /app/out --no-restore

FROM microsoft/dotnet:2.1-runtime-alpine3.7
WORKDIR /app
COPY --from=build-env /app/out ./

ENTRYPOINT ["sh", "-c"]
CMD ["dotnet AdminCore.DatabaseMigration.dll"]
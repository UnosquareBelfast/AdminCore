#include <enunciate-common.c>
#ifndef DEF_admin_core_ns0_securityConfiguration_H
#define DEF_admin_core_ns0_securityConfiguration_H

/**
 * (no documentation provided)
 */
struct admin_core_ns0_securityConfiguration {

};

/**
 * Reads a SecurityConfiguration from XML. The reader is assumed to be at the start element.
 *
 * @param reader The XML reader.
 * @return The SecurityConfiguration, or NULL in case of error.
 */
static struct admin_core_ns0_securityConfiguration *xmlTextReaderReadNs0SecurityConfigurationType(xmlTextReaderPtr reader);

/**
 * Writes a SecurityConfiguration to XML.
 *
 * @param writer The XML writer.
 * @param _securityConfiguration The SecurityConfiguration to write.
 * @return The bytes written (may be 0 in case of buffering) or -1 in case of error.
 */
static int xmlTextWriterWriteNs0SecurityConfigurationType(xmlTextWriterPtr writer, struct admin_core_ns0_securityConfiguration *_securityConfiguration);

/**
 * Frees the elements of a SecurityConfiguration.
 *
 * @param _securityConfiguration The SecurityConfiguration to free.
 */
static void freeNs0SecurityConfigurationType(struct admin_core_ns0_securityConfiguration *_securityConfiguration);

#endif /* DEF_admin_core_ns0_securityConfiguration_H */
#ifndef DEF_admin_core_ns0_swaggerResource_H
#define DEF_admin_core_ns0_swaggerResource_H

/**
 * (no documentation provided)
 */
struct admin_core_ns0_swaggerResource {


  /**
   * (no documentation provided)
   */
  xmlChar *swaggerVersion;

  /**
   * (no documentation provided)
   */
  xmlChar *location;

  /**
   * (no documentation provided)
   */
  xmlChar *name;
};

/**
 * Reads a SwaggerResource from XML. The reader is assumed to be at the start element.
 *
 * @param reader The XML reader.
 * @return The SwaggerResource, or NULL in case of error.
 */
static struct admin_core_ns0_swaggerResource *xmlTextReaderReadNs0SwaggerResourceType(xmlTextReaderPtr reader);

/**
 * Writes a SwaggerResource to XML.
 *
 * @param writer The XML writer.
 * @param _swaggerResource The SwaggerResource to write.
 * @return The bytes written (may be 0 in case of buffering) or -1 in case of error.
 */
static int xmlTextWriterWriteNs0SwaggerResourceType(xmlTextWriterPtr writer, struct admin_core_ns0_swaggerResource *_swaggerResource);

/**
 * Frees the elements of a SwaggerResource.
 *
 * @param _swaggerResource The SwaggerResource to free.
 */
static void freeNs0SwaggerResourceType(struct admin_core_ns0_swaggerResource *_swaggerResource);

#endif /* DEF_admin_core_ns0_swaggerResource_H */
#ifndef DEF_admin_core_ns0_uiConfiguration_H
#define DEF_admin_core_ns0_uiConfiguration_H

/**
 * (no documentation provided)
 */
struct admin_core_ns0_uiConfiguration {

};

/**
 * Reads a UiConfiguration from XML. The reader is assumed to be at the start element.
 *
 * @param reader The XML reader.
 * @return The UiConfiguration, or NULL in case of error.
 */
static struct admin_core_ns0_uiConfiguration *xmlTextReaderReadNs0UiConfigurationType(xmlTextReaderPtr reader);

/**
 * Writes a UiConfiguration to XML.
 *
 * @param writer The XML writer.
 * @param _uiConfiguration The UiConfiguration to write.
 * @return The bytes written (may be 0 in case of buffering) or -1 in case of error.
 */
static int xmlTextWriterWriteNs0UiConfigurationType(xmlTextWriterPtr writer, struct admin_core_ns0_uiConfiguration *_uiConfiguration);

/**
 * Frees the elements of a UiConfiguration.
 *
 * @param _uiConfiguration The UiConfiguration to free.
 */
static void freeNs0UiConfigurationType(struct admin_core_ns0_uiConfiguration *_uiConfiguration);

#endif /* DEF_admin_core_ns0_uiConfiguration_H */
#ifndef DEF_admin_core_ns0_securityConfiguration_M
#define DEF_admin_core_ns0_securityConfiguration_M

/**
 * Reads a SecurityConfiguration from XML. The reader is assumed to be at the start element.
 *
 * @return the SecurityConfiguration, or NULL in case of error.
 */
static struct admin_core_ns0_securityConfiguration *xmlTextReaderReadNs0SecurityConfigurationType(xmlTextReaderPtr reader) {
  int status, depth;
  void *_child_accessor;
  struct admin_core_ns0_securityConfiguration *_securityConfiguration = calloc(1, sizeof(struct admin_core_ns0_securityConfiguration));




  return _securityConfiguration;
}

/**
 * Writes a SecurityConfiguration to XML.
 *
 * @param writer The XML writer.
 * @param _securityConfiguration The SecurityConfiguration to write.
 * @return The total bytes written, or -1 on error;
 */
static int xmlTextWriterWriteNs0SecurityConfigurationType(xmlTextWriterPtr writer, struct admin_core_ns0_securityConfiguration *_securityConfiguration) {
  int status, totalBytes = 0, i;
  xmlChar *binaryData;

  return totalBytes;
}

/**
 * Frees the elements of a SecurityConfiguration.
 *
 * @param _securityConfiguration The SecurityConfiguration to free.
 */
static void freeNs0SecurityConfigurationType(struct admin_core_ns0_securityConfiguration *_securityConfiguration) {
  int i;
}
#endif /* DEF_admin_core_ns0_securityConfiguration_M */
#ifndef DEF_admin_core_ns0_swaggerResource_M
#define DEF_admin_core_ns0_swaggerResource_M

/**
 * Reads a SwaggerResource from XML. The reader is assumed to be at the start element.
 *
 * @return the SwaggerResource, or NULL in case of error.
 */
static struct admin_core_ns0_swaggerResource *xmlTextReaderReadNs0SwaggerResourceType(xmlTextReaderPtr reader) {
  int status, depth;
  void *_child_accessor;
  struct admin_core_ns0_swaggerResource *_swaggerResource = calloc(1, sizeof(struct admin_core_ns0_swaggerResource));



  if (xmlTextReaderIsEmptyElement(reader) == 0) {
    depth = xmlTextReaderDepth(reader);//track the depth.
    status = xmlTextReaderAdvanceToNextStartOrEndElement(reader);

    while (xmlTextReaderDepth(reader) > depth) {
      if (status < 1) {
        //panic: XML read error.
#if DEBUG_ENUNCIATE
        printf("Failure to advance to next child element.\n");
#endif
        freeNs0SwaggerResourceType(_swaggerResource);
        free(_swaggerResource);
        return NULL;
      }
      else if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
        && xmlStrcmp(BAD_CAST "swaggerVersion", xmlTextReaderConstLocalName(reader)) == 0
        && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
        printf("Attempting to read choice {}swaggerVersion of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
        _child_accessor = xmlTextReaderReadXsStringType(reader);
        if (_child_accessor == NULL) {
#if DEBUG_ENUNCIATE
          printf("Failed to read choice {}swaggerVersion of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
          //panic: unable to read the child element for some reason.
          freeNs0SwaggerResourceType(_swaggerResource);
          free(_swaggerResource);
          return NULL;
        }

        _swaggerResource->swaggerVersion = ((xmlChar*)_child_accessor);
        status = xmlTextReaderAdvanceToNextStartOrEndElement(reader);
      }
      else if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
        && xmlStrcmp(BAD_CAST "location", xmlTextReaderConstLocalName(reader)) == 0
        && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
        printf("Attempting to read choice {}location of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
        _child_accessor = xmlTextReaderReadXsStringType(reader);
        if (_child_accessor == NULL) {
#if DEBUG_ENUNCIATE
          printf("Failed to read choice {}location of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
          //panic: unable to read the child element for some reason.
          freeNs0SwaggerResourceType(_swaggerResource);
          free(_swaggerResource);
          return NULL;
        }

        _swaggerResource->location = ((xmlChar*)_child_accessor);
        status = xmlTextReaderAdvanceToNextStartOrEndElement(reader);
      }
      else if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
        && xmlStrcmp(BAD_CAST "name", xmlTextReaderConstLocalName(reader)) == 0
        && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
        printf("Attempting to read choice {}name of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
        _child_accessor = xmlTextReaderReadXsStringType(reader);
        if (_child_accessor == NULL) {
#if DEBUG_ENUNCIATE
          printf("Failed to read choice {}name of type {http://www.w3.org/2001/XMLSchema}string.\n");
#endif
          //panic: unable to read the child element for some reason.
          freeNs0SwaggerResourceType(_swaggerResource);
          free(_swaggerResource);
          return NULL;
        }

        _swaggerResource->name = ((xmlChar*)_child_accessor);
        status = xmlTextReaderAdvanceToNextStartOrEndElement(reader);
      }
      else {
#if DEBUG_ENUNCIATE > 1
        if (xmlTextReaderConstNamespaceUri(reader) == NULL) {
          printf("unknown child element {}%s for type {}swaggerResource.  Skipping...\n",  xmlTextReaderConstLocalName(reader));
        }
        else {
          printf("unknown child element {%s}%s for type {}swaggerResource. Skipping...\n", xmlTextReaderConstNamespaceUri(reader), xmlTextReaderConstLocalName(reader));
        }
#endif
        status = xmlTextReaderSkipElement(reader);
      }
    }
  }

  return _swaggerResource;
}

/**
 * Writes a SwaggerResource to XML.
 *
 * @param writer The XML writer.
 * @param _swaggerResource The SwaggerResource to write.
 * @return The total bytes written, or -1 on error;
 */
static int xmlTextWriterWriteNs0SwaggerResourceType(xmlTextWriterPtr writer, struct admin_core_ns0_swaggerResource *_swaggerResource) {
  int status, totalBytes = 0, i;
  xmlChar *binaryData;
  if (_swaggerResource->swaggerVersion != NULL) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "swaggerVersion", NULL);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write start element {}swaggerVersion. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
#if DEBUG_ENUNCIATE > 1
    printf("writing type {http://www.w3.org/2001/XMLSchema}string for element {}swaggerVersion...\n");
#endif
    status = xmlTextWriterWriteXsStringType(writer, (_swaggerResource->swaggerVersion));
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write type {http://www.w3.org/2001/XMLSchema}string for element {}swaggerVersion. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write end element {}swaggerVersion. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
  }
  if (_swaggerResource->location != NULL) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "location", NULL);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write start element {}location. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
#if DEBUG_ENUNCIATE > 1
    printf("writing type {http://www.w3.org/2001/XMLSchema}string for element {}location...\n");
#endif
    status = xmlTextWriterWriteXsStringType(writer, (_swaggerResource->location));
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write type {http://www.w3.org/2001/XMLSchema}string for element {}location. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write end element {}location. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
  }
  if (_swaggerResource->name != NULL) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "name", NULL);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write start element {}name. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
#if DEBUG_ENUNCIATE > 1
    printf("writing type {http://www.w3.org/2001/XMLSchema}string for element {}name...\n");
#endif
    status = xmlTextWriterWriteXsStringType(writer, (_swaggerResource->name));
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write type {http://www.w3.org/2001/XMLSchema}string for element {}name. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
#if DEBUG_ENUNCIATE
      printf("Failed to write end element {}name. status: %i\n", status);
#endif
      return status;
    }
    totalBytes += status;
  }

  return totalBytes;
}

/**
 * Frees the elements of a SwaggerResource.
 *
 * @param _swaggerResource The SwaggerResource to free.
 */
static void freeNs0SwaggerResourceType(struct admin_core_ns0_swaggerResource *_swaggerResource) {
  int i;
  if (_swaggerResource->swaggerVersion != NULL) {
#if DEBUG_ENUNCIATE > 1
    printf("Freeing type of accessor swaggerVersion of type admin_core_ns0_swaggerResource...\n");
#endif
    freeXsStringType(_swaggerResource->swaggerVersion);
#if DEBUG_ENUNCIATE > 1
    printf("Freeing accessor swaggerVersion of type admin_core_ns0_swaggerResource...\n");
#endif
    free(_swaggerResource->swaggerVersion);
  }
  if (_swaggerResource->location != NULL) {
#if DEBUG_ENUNCIATE > 1
    printf("Freeing type of accessor location of type admin_core_ns0_swaggerResource...\n");
#endif
    freeXsStringType(_swaggerResource->location);
#if DEBUG_ENUNCIATE > 1
    printf("Freeing accessor location of type admin_core_ns0_swaggerResource...\n");
#endif
    free(_swaggerResource->location);
  }
  if (_swaggerResource->name != NULL) {
#if DEBUG_ENUNCIATE > 1
    printf("Freeing type of accessor name of type admin_core_ns0_swaggerResource...\n");
#endif
    freeXsStringType(_swaggerResource->name);
#if DEBUG_ENUNCIATE > 1
    printf("Freeing accessor name of type admin_core_ns0_swaggerResource...\n");
#endif
    free(_swaggerResource->name);
  }
}
#endif /* DEF_admin_core_ns0_swaggerResource_M */
#ifndef DEF_admin_core_ns0_uiConfiguration_M
#define DEF_admin_core_ns0_uiConfiguration_M

/**
 * Reads a UiConfiguration from XML. The reader is assumed to be at the start element.
 *
 * @return the UiConfiguration, or NULL in case of error.
 */
static struct admin_core_ns0_uiConfiguration *xmlTextReaderReadNs0UiConfigurationType(xmlTextReaderPtr reader) {
  int status, depth;
  void *_child_accessor;
  struct admin_core_ns0_uiConfiguration *_uiConfiguration = calloc(1, sizeof(struct admin_core_ns0_uiConfiguration));




  return _uiConfiguration;
}

/**
 * Writes a UiConfiguration to XML.
 *
 * @param writer The XML writer.
 * @param _uiConfiguration The UiConfiguration to write.
 * @return The total bytes written, or -1 on error;
 */
static int xmlTextWriterWriteNs0UiConfigurationType(xmlTextWriterPtr writer, struct admin_core_ns0_uiConfiguration *_uiConfiguration) {
  int status, totalBytes = 0, i;
  xmlChar *binaryData;

  return totalBytes;
}

/**
 * Frees the elements of a UiConfiguration.
 *
 * @param _uiConfiguration The UiConfiguration to free.
 */
static void freeNs0UiConfigurationType(struct admin_core_ns0_uiConfiguration *_uiConfiguration) {
  int i;
}
#endif /* DEF_admin_core_ns0_uiConfiguration_M */

#import "admin-core.h"
#ifndef DEF_ADMIN_CORENS0UiConfiguration_M
#define DEF_ADMIN_CORENS0UiConfiguration_M

/**
 * (no documentation provided)
 */
@implementation ADMIN_CORENS0UiConfiguration

- (void) dealloc
{
  [super dealloc];
}
@end /* implementation ADMIN_CORENS0UiConfiguration */

/**
 * Internal, private interface for JAXB reading and writing.
 */
@interface ADMIN_CORENS0UiConfiguration (JAXB) <JAXBReading, JAXBWriting, JAXBType>

@end /*interface ADMIN_CORENS0UiConfiguration (JAXB)*/

/**
 * Internal, private implementation for JAXB reading and writing.
 */
@implementation ADMIN_CORENS0UiConfiguration (JAXB)

/**
 * Read an instance of ADMIN_CORENS0UiConfiguration from an XML reader.
 *
 * @param reader The reader.
 * @return An instance of ADMIN_CORENS0UiConfiguration defined by the XML reader.
 */
+ (id<JAXBType>) readXMLType: (xmlTextReaderPtr) reader
{
  ADMIN_CORENS0UiConfiguration *_aDMIN_CORENS0UiConfiguration = [[ADMIN_CORENS0UiConfiguration alloc] init];
  NS_DURING
  {
    [_aDMIN_CORENS0UiConfiguration initWithReader: reader];
  }
  NS_HANDLER
  {
    _aDMIN_CORENS0UiConfiguration = nil;
    [localException raise];
  }
  NS_ENDHANDLER

  [_aDMIN_CORENS0UiConfiguration autorelease];
  return _aDMIN_CORENS0UiConfiguration;
}

/**
 * Initialize this instance of ADMIN_CORENS0UiConfiguration according to
 * the XML being read from the reader.
 *
 * @param reader The reader.
 */
- (id) initWithReader: (xmlTextReaderPtr) reader
{
  return [super initWithReader: reader];
}

/**
 * Write the XML for this instance of ADMIN_CORENS0UiConfiguration to the writer.
 * Note that since we're only writing the XML type,
 * No start/end element will be written.
 *
 * @param reader The reader.
 */
- (void) writeXMLType: (xmlTextWriterPtr) writer
{
  [super writeXMLType:writer];
}

//documentation inherited.
- (BOOL) readJAXBAttribute: (xmlTextReaderPtr) reader
{
  void *_child_accessor;

  if ([super readJAXBAttribute: reader]) {
    return YES;
  }

  return NO;
}

//documentation inherited.
- (BOOL) readJAXBValue: (xmlTextReaderPtr) reader
{
  return [super readJAXBValue: reader];
}

//documentation inherited.
- (BOOL) readJAXBChildElement: (xmlTextReaderPtr) reader
{
  id __child;
  void *_child_accessor;
  int status, depth;

  if ([super readJAXBChildElement: reader]) {
    return YES;
  }

  return NO;
}

//documentation inherited.
- (int) readUnknownJAXBChildElement: (xmlTextReaderPtr) reader
{
  return [super readUnknownJAXBChildElement: reader];
}

//documentation inherited.
- (void) readUnknownJAXBAttribute: (xmlTextReaderPtr) reader
{
  [super readUnknownJAXBAttribute: reader];
}

//documentation inherited.
- (void) writeJAXBAttributes: (xmlTextWriterPtr) writer
{
  int status;

  [super writeJAXBAttributes: writer];

}

//documentation inherited.
- (void) writeJAXBValue: (xmlTextWriterPtr) writer
{
  [super writeJAXBValue: writer];
}

/**
 * Method for writing the child elements.
 *
 * @param writer The writer.
 */
- (void) writeJAXBChildElements: (xmlTextWriterPtr) writer
{
  int status;
  id __item;
  id __item_copy;
  NSEnumerator *__enumerator;

  [super writeJAXBChildElements: writer];

}
@end /* implementation ADMIN_CORENS0UiConfiguration (JAXB) */

#endif /* DEF_ADMIN_CORENS0UiConfiguration_M */
#ifndef DEF_ADMIN_CORENS0SwaggerResource_M
#define DEF_ADMIN_CORENS0SwaggerResource_M

/**
 * (no documentation provided)
 */
@implementation ADMIN_CORENS0SwaggerResource

/**
 * (no documentation provided)
 */
- (NSString *) swaggerVersion
{
  return _swaggerVersion;
}

/**
 * (no documentation provided)
 */
- (void) setSwaggerVersion: (NSString *) newSwaggerVersion
{
  [newSwaggerVersion retain];
  [_swaggerVersion release];
  _swaggerVersion = newSwaggerVersion;
}

/**
 * (no documentation provided)
 */
- (NSString *) location
{
  return _location;
}

/**
 * (no documentation provided)
 */
- (void) setLocation: (NSString *) newLocation
{
  [newLocation retain];
  [_location release];
  _location = newLocation;
}

/**
 * (no documentation provided)
 */
- (NSString *) name
{
  return _name;
}

/**
 * (no documentation provided)
 */
- (void) setName: (NSString *) newName
{
  [newName retain];
  [_name release];
  _name = newName;
}

- (void) dealloc
{
  [self setSwaggerVersion: nil];
  [self setLocation: nil];
  [self setName: nil];
  [super dealloc];
}
@end /* implementation ADMIN_CORENS0SwaggerResource */

/**
 * Internal, private interface for JAXB reading and writing.
 */
@interface ADMIN_CORENS0SwaggerResource (JAXB) <JAXBReading, JAXBWriting, JAXBType>

@end /*interface ADMIN_CORENS0SwaggerResource (JAXB)*/

/**
 * Internal, private implementation for JAXB reading and writing.
 */
@implementation ADMIN_CORENS0SwaggerResource (JAXB)

/**
 * Read an instance of ADMIN_CORENS0SwaggerResource from an XML reader.
 *
 * @param reader The reader.
 * @return An instance of ADMIN_CORENS0SwaggerResource defined by the XML reader.
 */
+ (id<JAXBType>) readXMLType: (xmlTextReaderPtr) reader
{
  ADMIN_CORENS0SwaggerResource *_aDMIN_CORENS0SwaggerResource = [[ADMIN_CORENS0SwaggerResource alloc] init];
  NS_DURING
  {
    [_aDMIN_CORENS0SwaggerResource initWithReader: reader];
  }
  NS_HANDLER
  {
    _aDMIN_CORENS0SwaggerResource = nil;
    [localException raise];
  }
  NS_ENDHANDLER

  [_aDMIN_CORENS0SwaggerResource autorelease];
  return _aDMIN_CORENS0SwaggerResource;
}

/**
 * Initialize this instance of ADMIN_CORENS0SwaggerResource according to
 * the XML being read from the reader.
 *
 * @param reader The reader.
 */
- (id) initWithReader: (xmlTextReaderPtr) reader
{
  return [super initWithReader: reader];
}

/**
 * Write the XML for this instance of ADMIN_CORENS0SwaggerResource to the writer.
 * Note that since we're only writing the XML type,
 * No start/end element will be written.
 *
 * @param reader The reader.
 */
- (void) writeXMLType: (xmlTextWriterPtr) writer
{
  [super writeXMLType:writer];
}

//documentation inherited.
- (BOOL) readJAXBAttribute: (xmlTextReaderPtr) reader
{
  void *_child_accessor;

  if ([super readJAXBAttribute: reader]) {
    return YES;
  }

  return NO;
}

//documentation inherited.
- (BOOL) readJAXBValue: (xmlTextReaderPtr) reader
{
  return [super readJAXBValue: reader];
}

//documentation inherited.
- (BOOL) readJAXBChildElement: (xmlTextReaderPtr) reader
{
  id __child;
  void *_child_accessor;
  int status, depth;

  if ([super readJAXBChildElement: reader]) {
    return YES;
  }
  if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
    && xmlStrcmp(BAD_CAST "swaggerVersion", xmlTextReaderConstLocalName(reader)) == 0
    && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
    NSLog(@"Attempting to read choice {}swaggerVersion of type {http://www.w3.org/2001/XMLSchema}string.");
#endif
    __child = [NSString readXMLType: reader];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully read choice {}swaggerVersion of type {http://www.w3.org/2001/XMLSchema}string.");
#endif

    [self setSwaggerVersion: __child];
    return YES;
  } //end "if choice"

  if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
    && xmlStrcmp(BAD_CAST "location", xmlTextReaderConstLocalName(reader)) == 0
    && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
    NSLog(@"Attempting to read choice {}location of type {http://www.w3.org/2001/XMLSchema}string.");
#endif
    __child = [NSString readXMLType: reader];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully read choice {}location of type {http://www.w3.org/2001/XMLSchema}string.");
#endif

    [self setLocation: __child];
    return YES;
  } //end "if choice"

  if (xmlTextReaderNodeType(reader) == XML_READER_TYPE_ELEMENT
    && xmlStrcmp(BAD_CAST "name", xmlTextReaderConstLocalName(reader)) == 0
    && xmlTextReaderConstNamespaceUri(reader) == NULL) {

#if DEBUG_ENUNCIATE > 1
    NSLog(@"Attempting to read choice {}name of type {http://www.w3.org/2001/XMLSchema}string.");
#endif
    __child = [NSString readXMLType: reader];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully read choice {}name of type {http://www.w3.org/2001/XMLSchema}string.");
#endif

    [self setName: __child];
    return YES;
  } //end "if choice"


  return NO;
}

//documentation inherited.
- (int) readUnknownJAXBChildElement: (xmlTextReaderPtr) reader
{
  return [super readUnknownJAXBChildElement: reader];
}

//documentation inherited.
- (void) readUnknownJAXBAttribute: (xmlTextReaderPtr) reader
{
  [super readUnknownJAXBAttribute: reader];
}

//documentation inherited.
- (void) writeJAXBAttributes: (xmlTextWriterPtr) writer
{
  int status;

  [super writeJAXBAttributes: writer];

}

//documentation inherited.
- (void) writeJAXBValue: (xmlTextWriterPtr) writer
{
  [super writeJAXBValue: writer];
}

/**
 * Method for writing the child elements.
 *
 * @param writer The writer.
 */
- (void) writeJAXBChildElements: (xmlTextWriterPtr) writer
{
  int status;
  id __item;
  id __item_copy;
  NSEnumerator *__enumerator;

  [super writeJAXBChildElements: writer];

  if ([self swaggerVersion]) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "swaggerVersion", NULL);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing start child element {}swaggerVersion."];
    }

#if DEBUG_ENUNCIATE > 1
    NSLog(@"writing element {}swaggerVersion...");
#endif
    [[self swaggerVersion] writeXMLType: writer];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully wrote element {}swaggerVersion...");
#endif

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing end child element {}swaggerVersion."];
    }
  }
  if ([self location]) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "location", NULL);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing start child element {}location."];
    }

#if DEBUG_ENUNCIATE > 1
    NSLog(@"writing element {}location...");
#endif
    [[self location] writeXMLType: writer];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully wrote element {}location...");
#endif

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing end child element {}location."];
    }
  }
  if ([self name]) {
    status = xmlTextWriterStartElementNS(writer, NULL, BAD_CAST "name", NULL);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing start child element {}name."];
    }

#if DEBUG_ENUNCIATE > 1
    NSLog(@"writing element {}name...");
#endif
    [[self name] writeXMLType: writer];
#if DEBUG_ENUNCIATE > 1
    NSLog(@"successfully wrote element {}name...");
#endif

    status = xmlTextWriterEndElement(writer);
    if (status < 0) {
      [NSException raise: @"XMLWriteError"
                   format: @"Error writing end child element {}name."];
    }
  }
}
@end /* implementation ADMIN_CORENS0SwaggerResource (JAXB) */

#endif /* DEF_ADMIN_CORENS0SwaggerResource_M */
#ifndef DEF_ADMIN_CORENS0SecurityConfiguration_M
#define DEF_ADMIN_CORENS0SecurityConfiguration_M

/**
 * (no documentation provided)
 */
@implementation ADMIN_CORENS0SecurityConfiguration

- (void) dealloc
{
  [super dealloc];
}
@end /* implementation ADMIN_CORENS0SecurityConfiguration */

/**
 * Internal, private interface for JAXB reading and writing.
 */
@interface ADMIN_CORENS0SecurityConfiguration (JAXB) <JAXBReading, JAXBWriting, JAXBType>

@end /*interface ADMIN_CORENS0SecurityConfiguration (JAXB)*/

/**
 * Internal, private implementation for JAXB reading and writing.
 */
@implementation ADMIN_CORENS0SecurityConfiguration (JAXB)

/**
 * Read an instance of ADMIN_CORENS0SecurityConfiguration from an XML reader.
 *
 * @param reader The reader.
 * @return An instance of ADMIN_CORENS0SecurityConfiguration defined by the XML reader.
 */
+ (id<JAXBType>) readXMLType: (xmlTextReaderPtr) reader
{
  ADMIN_CORENS0SecurityConfiguration *_aDMIN_CORENS0SecurityConfiguration = [[ADMIN_CORENS0SecurityConfiguration alloc] init];
  NS_DURING
  {
    [_aDMIN_CORENS0SecurityConfiguration initWithReader: reader];
  }
  NS_HANDLER
  {
    _aDMIN_CORENS0SecurityConfiguration = nil;
    [localException raise];
  }
  NS_ENDHANDLER

  [_aDMIN_CORENS0SecurityConfiguration autorelease];
  return _aDMIN_CORENS0SecurityConfiguration;
}

/**
 * Initialize this instance of ADMIN_CORENS0SecurityConfiguration according to
 * the XML being read from the reader.
 *
 * @param reader The reader.
 */
- (id) initWithReader: (xmlTextReaderPtr) reader
{
  return [super initWithReader: reader];
}

/**
 * Write the XML for this instance of ADMIN_CORENS0SecurityConfiguration to the writer.
 * Note that since we're only writing the XML type,
 * No start/end element will be written.
 *
 * @param reader The reader.
 */
- (void) writeXMLType: (xmlTextWriterPtr) writer
{
  [super writeXMLType:writer];
}

//documentation inherited.
- (BOOL) readJAXBAttribute: (xmlTextReaderPtr) reader
{
  void *_child_accessor;

  if ([super readJAXBAttribute: reader]) {
    return YES;
  }

  return NO;
}

//documentation inherited.
- (BOOL) readJAXBValue: (xmlTextReaderPtr) reader
{
  return [super readJAXBValue: reader];
}

//documentation inherited.
- (BOOL) readJAXBChildElement: (xmlTextReaderPtr) reader
{
  id __child;
  void *_child_accessor;
  int status, depth;

  if ([super readJAXBChildElement: reader]) {
    return YES;
  }

  return NO;
}

//documentation inherited.
- (int) readUnknownJAXBChildElement: (xmlTextReaderPtr) reader
{
  return [super readUnknownJAXBChildElement: reader];
}

//documentation inherited.
- (void) readUnknownJAXBAttribute: (xmlTextReaderPtr) reader
{
  [super readUnknownJAXBAttribute: reader];
}

//documentation inherited.
- (void) writeJAXBAttributes: (xmlTextWriterPtr) writer
{
  int status;

  [super writeJAXBAttributes: writer];

}

//documentation inherited.
- (void) writeJAXBValue: (xmlTextWriterPtr) writer
{
  [super writeJAXBValue: writer];
}

/**
 * Method for writing the child elements.
 *
 * @param writer The writer.
 */
- (void) writeJAXBChildElements: (xmlTextWriterPtr) writer
{
  int status;
  id __item;
  id __item_copy;
  NSEnumerator *__enumerator;

  [super writeJAXBChildElements: writer];

}
@end /* implementation ADMIN_CORENS0SecurityConfiguration (JAXB) */

#endif /* DEF_ADMIN_CORENS0SecurityConfiguration_M */

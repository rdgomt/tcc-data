# Spatial reference for GeoJSON files

All files on this folder were converted to **WGS84 (EPSG:4326)**.

"The coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN urn:ogc:def:crs:OGC::CRS84. An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid.  In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.  

Note: the use of alternative coordinate reference systems was specified in [GJ2008], but it has been removed from this version of the specification because the use of different coordinate reference systems -- especially in the manner specified in [GJ2008] -- has proven to have interoperability issues.  In general, GeoJSON processing software is not expected to have access to coordinate reference system databases or to have network access to coordinate reference system transformation parameters.  However, where all involved parties have a prior arrangement, alternative coordinate reference systems can be used without risk of data being misinterpreted."¹  

¹Source: https://tools.ietf.org/html/rfc7946

# Coordinates precision

During the conversion from Shapefile to GeoJSON it was determined a maximun of 5 digits as the decimal precision for the coordinates.

An interesting discussing about this matter is available at: https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude#8674
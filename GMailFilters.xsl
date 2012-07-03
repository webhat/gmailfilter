<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml" version="2.0"
    xmlns:apps="http://schemas.google.com/apps/2006" xmlns:rss="http://www.w3.org/2005/Atom">
    <xsl:output media-type="text/html" />

    <xsl:template match="rss:entry">
        <div>
            <xsl:attribute name="id">
                <xsl:value-of select="rss:id"/>
            </xsl:attribute>
            <xsl:attribute name="class" xml:space="preserve"><xsl:for-each select="apps:property/@name"><xsl:value-of select="."/> </xsl:for-each></xsl:attribute>
            <xsl:for-each select="apps:property/@name">
                <xsl:variable name="tagname" xml:space="preserve"><xsl:value-of select="."/></xsl:variable>
                <xsl:element name="{$tagname}" namespace="http://www.w3.org/1999/xhtml">
                    <xsl:attribute name="refid">
                        <xsl:value-of select="../../rss:id"/>
                    </xsl:attribute>
                    <xsl:if test="../@value != 'true'">
                    <xsl:value-of select="../@value"/>
                    </xsl:if>
                </xsl:element>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template match="/rss:feed">
        <html>
            <head>
                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"/>
                <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body>
                <div id="label"><span class="coltitle">Label</span></div>
                <div id="from"><span class="coltitle">From</span></div>
                <div id="hastheword"><span class="coltitle">With</span></div>
                <div id="to"><span class="coltitle">To</span></div>
                <div id="subject"><span class="coltitle">Subject</span></div>
                <div id="forwardto"><span class="coltitle">Forward To</span></div>
                <div id="doesnothavetheword"><span class="coltitle">WithOut</span></div>
                <div id="shouldarchive"><span class="coltitle">A</span></div>
                <div id="shouldstar"><span class="coltitle">S</span></div>
                <div id="shouldneverspam"><span class="coltitle">NS</span></div>
                <div id="shouldalwaysmarkasimportant"><span class="coltitle">I</span></div>
                <div id="shouldtrash"><span class="coltitle">T</span></div>
                <xsl:for-each select="rss:entry">
                    <xsl:apply-templates select="."/>
                </xsl:for-each>
                <textarea rows="2" cols="1" id="edit"/>
            </body>

            <script src="mailfilter_rules.js"></script>
        </html>
    </xsl:template>
</xsl:stylesheet>

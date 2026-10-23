---
title: "Operations Manager 2012 R2 – Management Packs pour Windows Server 2012 R2"
date: 2013-10-23T02:32:29
authors: [arnaud]
tags: ["Management Packs", "monitoring packs", "Operations Manager", "System Center 2012 R2", "Technet", "Windows Server 2012 R2"]
description: "Suite au lancement de Windows Server 2012 R2 et System Center 2012 R2, voici une petite liste des derniers management packs (avec la documentation qui va bien, pour effectuer le tuning correct) et quelques autres régalades liées à Operations Manager 2012 R2 et Windows Server 2012 R2. A noter, les bi"
---

Suite au lancement de Windows Server 2012 R2 et System Center 2012 R2, voici une petite liste des derniers management packs *(avec la documentation qui va bien, pour effectuer le tuning correct)* et quelques autres régalades liées à Operations Manager 2012 R2 et Windows Server 2012 R2.

<!-- truncate -->

A noter, les binaires des MP vont arriver sur le catalogue en ligne d’Operations Manager d’ici très peu, vous pourrez donc les récupérer directement depuis la console Operations Manager si c’est comme cela que vous procédez de manière habituelle.

# Management Packs Windows Server

Tous ces MP sont à jour pour Windows Server 2012 R2:

<table cellspacing="0" cellpadding="2" width="614" border="0"><tbody><tr><td valign="top" width="200"><strong>MP</strong></td><td valign="top" width="412"><strong>URL</strong></td></tr><tr><td valign="top" width="200">Windows Server Core OS</td><td valign="top" width="412"><a href="http://www.microsoft.com/en-us/download/details.aspx?id=9296">http://www.microsoft.com/en-us/download/details.aspx?id=9296</a></td></tr><tr><td valign="top" width="200">Active Directory Domain Services</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=21357" href="http://www.microsoft.com/en-us/download/details.aspx?id=21357">http://www.microsoft.com/en-us/download/details.aspx?id=21357</a>&nbsp;</td></tr><tr><td valign="top" width="200">Hyper-V</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40798" href="http://www.microsoft.com/en-us/download/details.aspx?id=40798">http://www.microsoft.com/en-us/download/details.aspx?id=40798</a>&nbsp;</td></tr><tr><td valign="top" width="200">Remote Access</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40802" href="http://www.microsoft.com/en-us/download/details.aspx?id=40802">http://www.microsoft.com/en-us/download/details.aspx?id=40802</a></td></tr><tr><td valign="top" width="200">Multi-Tenant RemoteAccess</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40807" href="http://www.microsoft.com/en-us/download/details.aspx?id=40807">http://www.microsoft.com/en-us/download/details.aspx?id=40807</a></td></tr><tr><td valign="top" width="200">Network Load Balancing</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=13302" href="http://www.microsoft.com/en-us/download/details.aspx?id=13302">http://www.microsoft.com/en-us/download/details.aspx?id=13302</a></td></tr><tr><td valign="top" width="200">Web Application Proxy</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40806" href="http://www.microsoft.com/en-us/download/details.aspx?id=40806">http://www.microsoft.com/en-us/download/details.aspx?id=40806</a></td></tr><tr><td valign="top" width="200">Internet Information Service 8.x</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=34767" href="http://www.microsoft.com/en-us/download/details.aspx?id=34767">http://www.microsoft.com/en-us/download/details.aspx?id=34767</a></td></tr><tr><td valign="top" width="200">WSUS</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40801" href="http://www.microsoft.com/en-us/download/details.aspx?id=40801">http://www.microsoft.com/en-us/download/details.aspx?id=40801</a></td></tr><tr><td valign="top" width="200">Active Directory Certificate Services</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=34765" href="http://www.microsoft.com/en-us/download/details.aspx?id=34765">http://www.microsoft.com/en-us/download/details.aspx?id=34765</a></td></tr><tr><td valign="top" width="200">Print Server</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40804" href="http://www.microsoft.com/en-us/download/details.aspx?id=40804">http://www.microsoft.com/en-us/download/details.aspx?id=40804</a></td></tr><tr><td valign="top" width="200">Windows Deployment Services</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40800" href="http://www.microsoft.com/en-us/download/details.aspx?id=40800">http://www.microsoft.com/en-us/download/details.aspx?id=40800</a></td></tr><tr><td valign="top" width="200">Windows Server 2012 R2 Essentials</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40809" href="http://www.microsoft.com/en-us/download/details.aspx?id=40809">http://www.microsoft.com/en-us/download/details.aspx?id=40809</a>&nbsp;</td></tr><tr><td valign="top" width="200">Active Directory Lightweight Directory Services (ADLDS)</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=1451" href="http://www.microsoft.com/en-us/download/details.aspx?id=1451">http://www.microsoft.com/en-us/download/details.aspx?id=1451</a></td></tr><tr><td valign="top" width="200">Windows Server Cluster</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=2268" href="http://www.microsoft.com/en-us/download/details.aspx?id=2268">http://www.microsoft.com/en-us/download/details.aspx?id=2268</a></td></tr><tr><td valign="top" width="200">Active Directory Rights Management Services</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40797" href="http://www.microsoft.com/en-us/download/details.aspx?id=40797">http://www.microsoft.com/en-us/download/details.aspx?id=40797</a></td></tr><tr><td valign="top" width="200">Message Queuing 6.3</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=41539" href="http://www.microsoft.com/en-us/download/details.aspx?id=41539">http://www.microsoft.com/en-us/download/details.aspx?id=41539</a></td></tr><tr><td valign="top" width="200">Distributed Transaction Coordinator</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=41560" href="http://www.microsoft.com/en-us/download/details.aspx?id=41560">http://www.microsoft.com/en-us/download/details.aspx?id=41560</a>&nbsp;</td></tr></tbody></table>

# Management Packs System Center 2012 R2

<table cellspacing="0" cellpadding="2" width="616" border="0"><tbody><tr><td valign="top" width="200">Orchestrator – Service Management Automation</td><td valign="top" width="414"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40858" href="http://www.microsoft.com/en-us/download/details.aspx?id=40858">http://www.microsoft.com/en-us/download/details.aspx?id=40858</a></td></tr><tr><td valign="top" width="200">Orchestrator</td><td valign="top" width="414"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=29269" href="http://www.microsoft.com/en-us/download/details.aspx?id=29269">http://www.microsoft.com/en-us/download/details.aspx?id=29269</a>&nbsp;</td></tr><tr><td valign="top" width="200">Service Manager</td><td valign="top" width="414"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=41136" href="http://www.microsoft.com/en-us/download/details.aspx?id=41136">http://www.microsoft.com/en-us/download/details.aspx?id=41136</a></td></tr><tr><td valign="top" width="200">Virtual Machine Manager</td><td valign="top" width="414"><em>Inclus dans les binaires R2 de VMM</em></td></tr><tr><td valign="top" width="200">Service Reporting</td><td valign="top" width="414"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=41135" href="http://www.microsoft.com/en-us/download/details.aspx?id=41135">http://www.microsoft.com/en-us/download/details.aspx?id=41135</a></td></tr></tbody></table>

# Management Packs Service Provider Foundation (SPF)

<table cellspacing="0" cellpadding="2" width="614" border="0"><tbody><tr><td valign="top" width="200">Service Provider Foundation (SPF)</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40867" href="http://www.microsoft.com/en-us/download/details.aspx?id=40867">http://www.microsoft.com/en-us/download/details.aspx?id=40867</a></td></tr></tbody></table>

# Management Packs Windows Azure

<table cellspacing="0" cellpadding="2" width="614" border="0"><tbody><tr><td valign="top" width="200">Windows Azure</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=38414" href="http://www.microsoft.com/en-us/download/details.aspx?id=38414">http://www.microsoft.com/en-us/download/details.aspx?id=38414</a>&nbsp;</td></tr><tr><td valign="top" width="200">Windows Azure Pack</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40805" href="http://www.microsoft.com/en-us/download/details.aspx?id=40805">http://www.microsoft.com/en-us/download/details.aspx?id=40805</a></td></tr><tr><td valign="top" width="200">Windows Azure Pack: Web Sites</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=40808" href="http://www.microsoft.com/en-us/download/details.aspx?id=40808">http://www.microsoft.com/en-us/download/details.aspx?id=40808</a>&nbsp;</td></tr></tbody></table>

# Autres

<table cellspacing="0" cellpadding="2" width="614" border="0"><tbody><tr><td valign="top" width="200">Microsoft Dynamics NAV 2013 R2</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=36388" href="http://www.microsoft.com/en-us/download/details.aspx?id=36388">http://www.microsoft.com/en-us/download/details.aspx?id=36388</a></td></tr><tr><td valign="top" width="200">Java Application Performance Monitoring</td><td valign="top" width="412"><a title="http://www.microsoft.com/en-us/download/details.aspx?id=39709" href="http://www.microsoft.com/en-us/download/details.aspx?id=39709">http://www.microsoft.com/en-us/download/details.aspx?id=39709</a></td></tr></tbody></table>

# Management Pack Authoring Extensions for Visual Studio

[http://www.microsoft.com/en-us/download/details.aspx?id=30169](http://www.microsoft.com/en-us/download/details.aspx?id=30169 "http://www.microsoft.com/en-us/download/details.aspx?id=30169") 

# Technical Documentation Operations Manager 2012 R2

[http://www.microsoft.com/en-us/download/details.aspx?id=29256](http://www.microsoft.com/en-us/download/details.aspx?id=29256 "http://www.microsoft.com/en-us/download/details.aspx?id=29256") 

# Pour débuter en douceur avec System Center

Technical Documentation for Getting Started with System Center 2012 R2- [http://www.microsoft.com/en-us/download/details.aspx?id=40814](http://www.microsoft.com/en-us/download/details.aspx?id=40814 "http://www.microsoft.com/en-us/download/details.aspx?id=40814") 

# Pour tester System Center 2012 R2 :

[http://technet.microsoft.com/fr-fr/evalcenter/dn205295](http://technet.microsoft.com/fr-fr/evalcenter/dn205295 "http://technet.microsoft.com/fr-fr/evalcenter/dn205295")

Pour tester Windows Server 2012 R2, vous pouvez télécharger gratuitement la version d’évaluation disponible sous la forme :

-   d'une image ISO : [https://aka.ms/jeveuxwindows2012r2](https://aka.ms/jeveuxwindows2012r2)
-   d'un fichier VHD avec un système préinstallé : [https://aka.ms/jeveuxwindows2012r2](https://aka.ms/jeveuxwindows2012r2)

Si vous souhaitez **découvrir en 4 heures nos technologies** telles que **Windows Server 2012 R2**, Windows **8.1 en entreprise**, le Cloud Privé ou Hybride, vous pouvez vous inscrire gratuitement à un de nos IT Camps :

[https://aka.ms/itCampFr](http://www.microsoft.com/click/services/Redirect2.ashx?CR_CC=200260510)

\*derniers ajouts le 08/01/2014

Arnaud – [les bons tuyaux](https://www.facebook.com/arnaudlheureuxitpro)

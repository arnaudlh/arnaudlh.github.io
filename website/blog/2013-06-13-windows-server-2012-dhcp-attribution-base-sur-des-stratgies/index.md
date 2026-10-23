---
title: "Windows Server 2012 DHCP : Attribution basée sur des stratégies"
date: 2013-06-13T04:34:19
authors: [arnaud]
tags: ["DHCP", "gestion réseau", "IPv4", "stratégies", "Technet", "Windows Server 2012"]
description: "Dans un article précédent, nous discutions avec Stanislas du failover du service DHCP dans Windows Server 2012. Il existe une autre nouveauté dans Windows Server 2012 : l’affectation fondée sur des stratégies (ou PBA pour Policy Based Assignment). Cette fonctionnalité longtemps attendue permet de di"
---

Dans un article précédent, nous discutions avec [Stanislas](https://aka.ms/stanislas) du failover du service DHCP dans Windows Server 2012. Il existe une autre nouveauté dans Windows Server 2012 : l’affectation fondée sur des stratégies (ou PBA pour *Policy Based Assignment*). Cette fonctionnalité longtemps attendue permet de distribuer des adresses IP ou des paramètres particuliers à une machine selon des critères comme son adresse MAC, son Vendor ID, etc. Pour découvrir cela, c’est par ici :

<!-- truncate -->

Quelques références pour lecture sur la plage :

-   Guide de configuration pas à pas – [http://technet.microsoft.com/fr-fr/library/hh831538.aspx](http://technet.microsoft.com/fr-fr/library/hh831538.aspx "http://technet.microsoft.com/fr-fr/library/hh831538.aspx")
-   Création de stratégies pour distribuer des baux avec durées différentes selon les types de machines : [http://blogs.technet.com/b/teamdhcp/archive/2012/09/22/using-dhcp-policies-to-set-different-lease-durations-for-different-device-types.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/09/22/using-dhcp-policies-to-set-different-lease-durations-for-different-device-types.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/09/22/using-dhcp-policies-to-set-different-lease-durations-for-different-device-types.aspx") 
-   DHCP Server Cmdlets in Windows PowerShell – [http://technet.microsoft.com/library/jj590751](http://technet.microsoft.com/library/jj590751 "http://technet.microsoft.com/library/jj590751")
-   Pour migrer son serveur DHCP vers 2012 (bon c’est la version 2008R2, mais elle s’applique aussi à 2012!) – [http://technet.microsoft.com/fr-fr/library/dd379535(v=WS.10).aspx](http://technet.microsoft.com/fr-fr/library/dd379535\(v=WS.10\).aspx "http://technet.microsoft.com/fr-fr/library/dd379535(v=WS.10).aspx") 

Pour tester tout cela, , vous pouvez télécharger gratuitement la version d’évaluation de Windows Server 2012 disponible sous la forme :  
– d'une image ISO : [https://aka.ms/jeveuxwindows2012](https://aka.ms/jeveuxwindows2012)  
– d'un fichier VHD avec un système préinstallé : [https://aka.ms/jeveuxwindows2012](https://aka.ms/jeveuxwindows2012)

Enfin, si vous souhaitez découvrir en 4 heures Windows Server 2012, Windows 8 en entreprise, le Cloud Privé ou Hybride par Microsoft, vous pouvez vous inscrire gratuitement à un de nos IT Camps : [https://aka.ms/itCampFr](https://aka.ms/itCampFr)

Arnaud – [les bons tuyaux](https://www.facebook.com/arnaudlheureuxitpro)

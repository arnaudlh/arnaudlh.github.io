---
title: "Windows Server 2012 : DHCP Failover"
date: 2013-03-21T05:21:55
authors: [arnaud]
tags: ["DHCP", "IPv4", "réseau", "Windows Server 2012"]
description: "Encore une petite session où Stanislas et moi-même discutons de Windows Server 2012 et plus particulièrement les améliorations du service DHCP comme le failover ou basculement sans utilisation de Windows Clustering. Cette fonctionnalité permet d’offrir une disponibilité continue du service DHCP aux "
---

Encore une petite session où [Stanislas](https://aka.ms/stanislas) et moi-même discutons de Windows Server 2012 et plus particulièrement les améliorations du service DHCP comme le failover ou basculement sans utilisation de Windows Clustering. Cette fonctionnalité permet d’offrir une disponibilité continue du service DHCP aux clients en répliquant les informations entre serveurs et basculant en cas de problème sur une machine.

<!-- truncate -->

Quelques références venant du blog de l’équipe produit :

-   Guides étape par étape : [http://technet.microsoft.com/en-us/library/hh831385.aspx](http://technet.microsoft.com/en-us/library/hh831385.aspx "http://technet.microsoft.com/en-us/library/hh831385.aspx")
-   Introduction a DHCP Failover : [http://blogs.technet.com/b/teamdhcp/archive/2012/06/28/ensuring-high-availability-of-dhcp-using-windows-server-2012-dhcp-failover.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/06/28/ensuring-high-availability-of-dhcp-using-windows-server-2012-dhcp-failover.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/06/28/ensuring-high-availability-of-dhcp-using-windows-server-2012-dhcp-failover.aspx")
-   Failover en mode Hot-Standy : [http://blogs.technet.com/b/teamdhcp/archive/2012/09/03/dhcp-failover-hot-standby-mode.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/09/03/dhcp-failover-hot-standby-mode.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/09/03/dhcp-failover-hot-standby-mode.aspx") 
-   Failover en mode Load Balancing : [http://blogs.technet.com/b/teamdhcp/archive/2012/08/06/dhcp-failover-load-balancing-mode.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/08/06/dhcp-failover-load-balancing-mode.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/08/06/dhcp-failover-load-balancing-mode.aspx")
-   Déploiements multi sites : [http://blogs.technet.com/b/teamdhcp/archive/2012/09/05/multi-site-deployment-topologies-for-dhcp-failover.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/09/05/multi-site-deployment-topologies-for-dhcp-failover.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/09/05/multi-site-deployment-topologies-for-dhcp-failover.aspx") 
-   Migration vers DHCP Failover : [http://blogs.technet.com/b/teamdhcp/archive/2012/09/11/migrating-existing-dhcp-server-deployment-to-windows-server-2012-dhcp-failover.aspx](http://blogs.technet.com/b/teamdhcp/archive/2012/09/11/migrating-existing-dhcp-server-deployment-to-windows-server-2012-dhcp-failover.aspx "http://blogs.technet.com/b/teamdhcp/archive/2012/09/11/migrating-existing-dhcp-server-deployment-to-windows-server-2012-dhcp-failover.aspx") 

Pour tester tout cela, , vous pouvez télécharger gratuitement la version d’évaluation de Windows Server 2012 disponible sous la forme :  
\- d'une image ISO : [https://aka.ms/jeveuxwindows2012](https://aka.ms/jeveuxwindows2012)  
\- d'un fichier VHD avec un système préinstallé : [https://aka.ms/jeveuxwindows2012](https://aka.ms/jeveuxwindows2012)

En plus, tous les 10 téléchargements avant le 1er avril 2013 à minuit, un livre numérique offert « Windows Server 2012 : Les bases indispensables pour administrer et configurer votre serveur » en partenariat avec les éditions ENI.

Enfin, si vous souhaitez découvrir en 4 heures Windows Server 2012, Windows 8 en entreprise, le Cloud Privé ou Hybride par Microsoft, vous pouvez vous inscrire gratuitement à un de nos IT Camps : [https://aka.ms/itCampFr](https://aka.ms/itCampFr)

[Arnaud Lheureux](https://twitter.com/ArnaudLheureux)

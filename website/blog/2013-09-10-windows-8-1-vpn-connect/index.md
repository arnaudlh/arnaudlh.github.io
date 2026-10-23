---
title: "Windows 8.1 VPN Connect"
date: 2013-09-10T03:45:00
authors: [arnaud]
tags: ["Accès distants", "Technet", "Windows 8.1"]
description: "Parmi les nouveautés de Windows 8.1, on compte quelques évolutions concernant les accès distants, dans ce blog nous en couvrirons un certain nombre, regardons aujourd’hui VPN Connect. Le principe est simple : monter automatiquement une connexion VPN au réseau d’entreprise lorsque : Une application ("
---

Parmi les nouveautés de Windows 8.1, on compte quelques évolutions concernant les accès distants, dans ce blog nous en couvrirons un certain nombre, regardons aujourd’hui VPN Connect.

<!-- truncate -->

Le principe est simple : monter automatiquement une connexion VPN au réseau d’entreprise lorsque :

-   Une application (moderne ou classique) est lancée
-   La machine/application utilise un suffixe DNS particulier

Bref, une technologie qui permet un accès au réseau d’entreprise quasi transparent, cela devrait vous faire penser à DirectAccess !

Et bien pas du tout ! VPN Connect c’est une technologie d’accès facile et sécurisé au réseau d’entreprise dans le cadre du BYOD (*Bring Your Own Device*). On est assez loin du spectre de fonctionnalités offertes par DirectAccess comme l’accès transparent au réseau y compris avant le logon d’un utilisateur.  

Point à noter TRES important qui devrait confirmer que cette technologie est vraiment faite pour le BYOD, la connexion automatique d’un VPN ne fonctionne PAS sur une machine jointe au domaine.

# Prérequis :

Cette fonctionnalité peut être mise en œuvre avec tout type de VPN supporté dans Windows 8.1 *(nous traiterons dans un article ultérieur les évolutions du client VPN)*. Dans cet article nous ne donnons pas les détails de la plateforme serveur VPN, car ils s’agit d’une plateforme standard configurée avec l’assistant par défaut de Windows Server 2012 R2.

La machine cliente doit être une machine Windows 8.1 NON jointe à un domaine, et PAS d’édition Entreprise.

Le type de VPN est obligatoirement Split Tunneling, ceci permet de ne pas modifier la connectivité des autres applications lorsque l’on établit la liaison pour une application particulière.

# Tests :

Mettons en place cette fonctionnalité pour différents scenarios.

Dans ces rubriques, j’ai au préalable créé sur la machine cliente un profile VPN nommé “VpnArnaud”.

J’ai modifié le type de tunneling avec la commande PowerShell:

Set-VpnConnection –name VpnArnaud –SplitTunneling $true

## Connexion automatique pour une application moderne

La première chose à faire est de trouver l’application que l’on veut utiliser, dans notre exemple, nous connectons automatiquement le VPN lors du lancement de l’application Video :

[![zunevideo](./8311.zunevideo_thumb_543b760b.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/8461.zunevideo_19C07637.png)

Pour chercher l’identifiant de cette application, nous utilisons la commande PowerShell :

Get-AppxPackage

[![get-appxpackage](./6237.get-appxpackage_thumb_4a9307d5.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/3554.get-appxpackage_04824AC2.png)

Le champ utilisé ici est le PackageFamilyName, nous pouvons alors ajouter la configuration :

Add-VpnConnectionTriggerApplication –name <vpnConnectionName> –ApplicationID <PackageFamilyName>

[![add-vpnconnectiontriggerapp1](./2772.add-vpnconnectiontriggerapp1_thumb_213bbfd7.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/1374.add-vpnconnectiontriggerapp1_2FE66BBC.png)

Au lancement de l’application vidéo, nous avons alors l’avertissement :

[![CaptureDialup](./6433.capturedialup_thumb_4d7846bb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/2783.CaptureDialup_674C7CEA.png)

Je dois ensuite saisir mes informations de connexion si elles ne sont pas stockées.

 [![vpncreds](./8154.vpncreds_thumb_5da40eb4.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/3252.vpncreds_53BF1D49.png)

J’obtiens alors bien la machine connectée :

[![zunevideoconnect](./7851.zunevideoconnect_thumb_7ba21ca8.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/1641.zunevideoconnect_75C7790F.png)

Lorsque toutes les applications qui ont besoin de la connexion sont fermées, alors la connexion est automatiquement tombée.

## Connexion automatique pour une application classique

Il est possible d’établir une connexion de la même manière pour les applications Windows classiques. On utilisera toujours l’argument –ApplicationID, mais cette fois on précisera la chemin vers l’application :

Add-VpnConnectionTriggerApplication –name <vpnConnectionName> –ApplicationID “c:\\windows\\system32\\notepad.exe”

A noter, on peut utiliser les variables d’environnement avec la forme “$env:windir\\…”

On peut ensuite vérifier la configuration avec la commande Get-VpnConnectionTrigger –name <vpnConnectionName>

[![triggernotepad](./3603.triggernotepad_thumb_59d64417.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/4336.triggernotepad_017CC042.png)

## Connexion automatique pour un suffixe DNS

De la même manière, on peut déclencher une connexion lorsqu’un suffixe DNS particulier est utilisé :

Add-VpnConnectionTriggerDnsConfiguration –name <vpnConnectionName> –DnsSuffix “.itcamp.contoso.com” –DnsIPAddress <AdressIPduServeurDNS>

[![add-vpnconnectiontriggerdns](./2477.add-vpnconnectiontriggerdns_thumb_3ebd7509.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/4111.add-vpnconnectiontriggerdns_78ACB7F5.png)

N’oubliez surtout pas le point avant le suffixe DNS !

Remarquons au passage que pour chaque suffixe, on doit mentionner l’adresse IP d’un serveur DNS qui sera utilisé. Nous allons mettre en œuvre un composant de Windows apparu avec Windows 7, la NRPT (*Name Resolution Policy Table*) qui permet de faire de la résolution de nom conditionnelle sur le poste client.

[![add-vpnconnectiontriggerdns2](./3441.add-vpnconnectiontriggerdns2_thumb_29eb7c89.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/4075.add-vpnconnectiontriggerdns2_2FA6962F.png)

On peut également profiter de cette ligne de commande pour ajouter automatiquement une liste de suffixes de recherche DNS lorsque le VPN est monté, cela permet de résoudre des noms courts sur le réseau d’entreprise, on utilise alors l’argument –DnsSuffixSearchList <listeDeSuffixesàAjouter>.

On a alors une notification lorsque l’on utilise le contexte de noms :

[![add-vpnconnectiontriggerdns3](./8547.add-vpnconnectiontriggerdns3_thumb_261db1ec.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/1665.add-vpnconnectiontriggerdns3_5A9E8434.png)

Voilà pour cette petite intro à VPN Connect, a noter, lorsque les credentials sont stockés, on a automatiquement la connexion qui est montée !

Si  vous souhaitez **découvrir en 4 heures nos technologies** telles que Windows Server 2012 R2, Windows 8.1 en entreprise, le Cloud Privé ou Hybride par Microsoft, vous pouvez vous inscrire gratuitement à un de nos **IT Camp** : [https://aka.ms/itCampFr](http://www.microsoft.com/click/services/Redirect2.ashx?CR_CC=200260510&CR_EAC=300100780).

Références :

[http://technet.microsoft.com/en-us/library/jj554820(v=wps.630).aspx](http://technet.microsoft.com/en-us/library/jj554820\(v=wps.630\).aspx "http://technet.microsoft.com/en-us/library/jj554820(v=wps.630).aspx") – VPN Client Cmdlets in Windows PowerShell

Arnaud – [les bons tuyaux](https://www.facebook.com/arnaudlheureuxitpro)

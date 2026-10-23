---
title: "Authentification multi facteurs avec Windows Azure Multi-Factor Authentication – partie 1"
date: 2013-11-05T07:02:33
authors: [arnaud]
tags: ["Accès distants", "Active Directory", "Authentification Multi Facteurs", "Authentification SMS", "Authentification téléphone", "sécurité", "Technet", "Windows Azure", "Windows Azure Multi-Factor Authentication", "Windows Server 2012", "Windows Server 2012 R2"]
description: "Microsoft a racheté il y a quelques mois la société PhoneFactor, et son service d’authentification a été intégré au sein de nos solutions en tant que Windows Azure Multi-Factor Authentication (pour les plus assidus, il s’est aussi appelé Windows Azure Active Authentication durant quelques semaines)."
---

Microsoft a racheté il y a quelques mois la société *PhoneFactor*, et son service d’authentification a été intégré au sein de nos solutions en tant que *Windows Azure Multi-Factor Authentication (pour les plus assidus, il s’est aussi appelé Windows Azure Active Authentication durant quelques semaines).*

<!-- truncate -->

Restons simples : Il s’agit ici d’offrir à nos clients un service d’authentification multi facteur utilisant un système dont nous disposons normalement tous : le téléphone. Lorsqu’un utilisateur va s’authentifier sur des ressources de l’entreprise hébergées sur site ou même dans un cloud, en plus des credentials du domaine, l’utilisateur sera authentifié avec son téléphone.

L’objectif de cette série d’articles est de vous montrer comment mettre en œuvre pas à pas la solution pour protéger l’accès à différents types de ressources.

Nous aurons plusieurs articles dans cette série :

1.  **Introduction à** ***Windows Azure Multi-Factor Authentication** (vous êtes ici)*
2.  [Installation et paramétrage du serveur Windows Azure Multi Factor Authentication](http://blogs.technet.com/b/arnaud/archive/2013/11/08/authentification-multi-facteur-avec-windows-azure-multi-factor-authentication-partie-2.aspx)
3.  [Installation et paramétrage de Remote Desktop Gateway](http://blogs.technet.com/b/arnaud/archive/2013/11/25/authentification-multi-facteur-avec-windows-azure-multi-factor-authentication-partie-3-windows-server-2012-r2-remote-desktop-gateway.aspx)
4.  [Installation et paramétrage du portail utilisateur](http://blogs.technet.com/b/arnaud/archive/2014/01/20/authentification-multi-facteurs-avec-windows-azure-multi-factor-authentication-partie-4-portail-utilisateur.aspx)
5.  [Installation et paramétrage pour l’application mobile](http://blogs.technet.com/b/arnaud/archive/2014/06/16/authentification-multi-facteurs-avec-azure-multi-factor-authentication-partie-5-application-mobile.aspx)
6.  [Installation et paramétrage pour ADFS](http://blogs.technet.com/b/arnaud/archive/2014/07/01/authentification-multi-facteurs-avec-azure-multi-factor-authentication-partie-6-int-233-gration-adfs.aspx)

## Méthodes d’authentification utilisables

A l’heure actuelle, les méthodes supportées pour s’authentifier sont :

-   **Appel téléphonique automatisé** : l’utilisateur doit répondre à l’appel et presser une touche ou un code PIN.
-   **Echange de SMS** : l’utilisateur reçoit un SMS avec code OTP (one-time password) avec ou sans envoi de code PIN préalable
-   **Application** sur **téléphone** ou **tablette** : une fois le périphérique associé à l’utilisateur, il génèrera un code d’authentification toujours avec la possibilité de saisie d’un code PIN préalable. L’application est présente sur les platerformes principales du marché :

> [![WindowsStore_badge_black_en_small_40x125](./2364.windowsstore_badge_black_en_small_40x125_thumb_39052e9b.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/5076.WindowsStore_badge_black_en_small_40x125_745603A8.png)
> 
> [![google_pla_store_android](./7510.google_pla_store_android_5af0911f.png)](https://play.google.com/store/apps/details?id=com.phonefactor.phonefactor "https://play.google.com/store/apps/details?id=com.phonefactor.phonefactor")
> 
> [![itunes_en](./4010.itunes_en_thumb_59ae88f1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/95/48/metablogapi/2251.itunes_en_584A661F.png)
> 
> [Lien](http://www.windowsphone.com/fr-fr/store/app/multi-factor-auth/0a9691de-c0a1-44ee-ab96-6807f8322bd1)
> 
> [Lien](https://play.google.com/store/apps/details?id=com.phonefactor.phonefactor)
> 
> [Lien](https://itunes.apple.com/app/phonefactor/id475844606?mt=8)

## Applications supportées

MFA permet de sécuriser l’accès à des applications directement dans un service de cloud comme Windows Azure, Office 365 et Dynamics CRM Online ou tout autre service qui s’intègre avec Windows Azure Active Directory.

Pour sécuriser des services dans vos datacenter, c’est aussi un composant serveur qui s’installe dans votre sur Windows Server et permet d’authentifier :

-   connexion Terminal Server
-   accès VPN
-   accès à la messagerie OWA
-   accès à ADFS
-   accès à une application IIS

Enfin c’est également un Software Development Kit pour intégrer la solution à un projet plus personnalisé.

En attendant la suite pour mettre en œuvre la technologie dans un environnement de test, quelques lectures :

Technical Scenarios for Windows Azure Multi-Factor Authentication – [http://technet.microsoft.com/en-us/library/dn394279.aspx](http://technet.microsoft.com/en-us/library/dn394279.aspx "http://technet.microsoft.com/en-us/library/dn394279.aspx") 

Windows Azure Multi-Factor Authentication Release Notes – [http://technet.microsoft.com/en-us/library/dn465794.aspx](http://technet.microsoft.com/en-us/library/dn465794.aspx "http://technet.microsoft.com/en-us/library/dn465794.aspx") 

Quelques exemples de mise en œuvre de la technologie chez Fredrikson & Byron, [http://www.microsoft.com/casestudies/Case\_Study\_Detail.aspx?casestudyid=710000003252](http://www.microsoft.com/casestudies/Case_Study_Detail.aspx?casestudyid=710000003252 "http://www.microsoft.com/casestudies/Case_Study_Detail.aspx?casestudyid=710000003252")

Pour tester *Windows Azure Multi-Factor Authentication*, vous pouvez évaluer Azure par ici : [https://aka.ms/Azure0Euro](https://aka.ms/Azure0Euro)

Pour tester Windows Server 2012 R2, vous pouvez télécharger gratuitement la version d’évaluation disponible sous la forme :

-   d'une image ISO : [https://aka.ms/jeveuxwindows2012r2](https://aka.ms/jeveuxwindows2012r2)
-   d'un fichier VHD avec un système préinstallé : [https://aka.ms/jeveuxwindows2012r2](https://aka.ms/jeveuxwindows2012r2)

Si vous souhaitez **découvrir en 4 heures nos technologies** telles que **Windows Server 2012 R2**, Windows **8.1 en entreprise**, le Cloud Privé ou Hybride, vous pouvez vous inscrire gratuitement à un de nos IT Camps :

[https://aka.ms/itCampFr](http://www.microsoft.com/click/services/Redirect2.ashx?CR_CC=200260510&CR_EAC=300100780)

Arnaud – [les bons tuyaux](https://www.facebook.com/arnaudlheureuxitpro)

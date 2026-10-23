---
title: "Windows 10 pour l’Entreprise : quoi de neuf ?"
date: 2015-05-11T06:29:02
authors: [arnaud]
tags: ["Azure Active Directory", "Device Lockdown", "DeviceGuard", "Enterprise Data Protection", "Entreprise", "MDM", "Microsoft Passport", "sécurité", "Technet", "Windows 10", "Windows Hello"]
description: "Lors de l’&eacute;v&eacute;nement Ignite &agrave; Chicago, Satya Nadella a rappel&eacute; une chose : nous fournissons les produits et solutions qui permettent aux personnes d’en faire plus, dans leur vie professionnelle comme personnelle. Nos rythmes de vies et de travail changent et Windows ainsi "
---

Lors de l’événement Ignite à Chicago, Satya Nadella a rappelé une chose : nous fournissons les produits et solutions qui permettent aux personnes d’en faire plus, dans leur vie professionnelle comme personnelle.

<!-- truncate -->

Nos rythmes de vies et de travail changent et Windows ainsi que nous solutions accompagnent ce changement au rythme de chacun.

L’objectif de cet article est de revoir les principales nouveautés de Windows 10 qui concernent le monde de l’entreprise.

Parmi les sujets fondamentaux pour l’entreprise : protection des données des utilisateurs, gestions des identités, sécurité et intégrité de la machine, et surtout une maintenance plus aisées en commençant par des mécanismes de déploiement simplifiés.

## 1\. Protection de l’information

**Enterprise Data Protection**est un ensemble de technologies que l’on peut activer pour mieux gérer les données personnelles et professionnelles, dans un seul environnement.

Il a été montré à Ignite l’exemple d’un document édité dans Office déployé avec Intune et spécifié comme application d’entreprise : on a alors un containeur dédié aux informations d’entreprise qui apparait, celui-ci est automatiquement chiffré, il est alors aussi impossible de copier/coller des informations entre l’Office d’entreprise et toute autre application qui n’est pas également marquée comme entreprise.

Combiné à des technologies comme **Azure RMS Document Tracking** ([http://blogs.technet.com/b/rms/archive/2015/05/04/doctracking.aspx](https://blogs.technet.com/b/rms/archive/2015/05/04/doctracking.aspx)) cela fournit des résultats spéctaculaires pour la gestion des documents sensibles en entreprise.

## 2\. Protection de l’identité

Avec **[Microsoft Passport](https://channel9.msdn.com/events/Ignite/2015/BRK2333)**, nous souhaitons sonner la fin de l’utilisation des mots passe, et utiliser de manière plus large des certificats en utilisant le Trusted Platform Module (TPM), maintenant omniprésent sur les machines, pour stocker les clés privées. L’accès à ce moyen d’authentification se faisant ensuite en utilisant un code PIN, ou de la biométrie (empreinte digital, visage, etc.)

**Windows Hello** est la partie visible de Passport et permet par exemple une authentification par biométrie en reconnaissance faciale (cela nécessite tout de même des capteurs spéciaux comme la caméra [RealSense 3D de Intel](https://software.intel.com/en-us/RealSense/F200Camera)qui est déjà intégrée à certains laptops.)

## 3\. Protection de la machine

**DeviceGuard**est une technologie qui permet de n’exécuter que ce qui est désigné comme digne de confiance par l’entreprise. Ce mécanisme peut être renforcé encore en utilisant la virtualisation matérielle.

La **virtualisation matérielle** (Hyper-V Virtual Secure Mode) est utilisée par LSASS (le service qui qui possède les hashs et jetons d’authentifications) pour tourner dans un niveau de confiance différent du noyau et des autres processus, ce qui permet **d’éviter de voler les secrets**et donc d’utiliser des mécanismes de récupération du hash.

## 4\. Gestion des machines

Le client Mobile Device Management (**MDM**) inclus et compatible OMA-DM 2.0 évolue et permet notamment maintenant un effacement à distance de la machine en cas de perte/vol. Cet effacement passe par un retour à l’image d’originale de la machine. Parmi les autres possibilités : gestion de multiples utilisateurs, des profils VPN, etc.

On peut **joindre** une **machine** Windows 10 à un domaine **Azure Active Directory** et donc utiliser **l’identité cloud** d’un utilisateur en bénéficiant de **Single Sign On** (SSO) et de gestion de la machine de manière transparente (combiné à **Intune**)

**Accès conditionnel**: en fonction de critères de conformité (définis dans SCCM ou Intune) on pourra restreindre l’accès à une application.

**Device Lockdown**: évolution du mode assigné qui permet de préparer des machines qui sont en libre-service (kiosque). Ce mode évolue pour être plus personnalisable (couleurs, menus etc.)

**Gestion des certificats**: on peut gérer le déploiement (et suppresion) des certificats sur les machines en utilisant le format PFX et en utilisant le protocol SCEP (Simple Certificate Enrollment Protocol)

## 5\. Déploiement aisé

Vous avez sans doute lu que Windows 10 sera proposé gratuitement pour les possesseurs d’éditions grand public de Windows 7 et ultérieur. Celui-ci sera déployé au monde avec **Windows Update** : **sauf** pour la version **Entreprise**.

La version Entreprise se déploiera de plusieurs manières :

-   **Wipe and Load** : ce que l’on connait actuellement, dans une mise à jour en entreprise. Capture de l’état utilisateur, installation du nouvel OS, restauration de l’état utilisateur.
-   **Mise à jour en place** : installation par WSUS ou Windows Update for Business (je parlerai de cette fonctionnalité dans un autre article).
-   **Provisionning packages** : qui permettront de déployer facilement des portions d’OS, des logiciels, des paramètres comme le Wifi, VPN, certificats, etc. On pourra aussi par exemple simplement passer d’une édition grand public de Windows à la version Entreprise (utile dans le Bring Your Own Device)

Notons également un changement fondamental dans la manière dont nous gérons les mises à jour : l’apparation d’une branche de support long terme, qui si vous la choisissez, ne mettra à jour que les failles de sécurité et aucun autre composants. [Plus de details sur le Blog de Terry.](http://blogs.windows.com/bloggingwindows/2015/05/04/announcing-windows-update-for-business/)

## 6\. Meilleure productivité

Windows 10 a aussi pour vocation d’être un OS que les gens et les entreprises désirent (Joe Belfiore). Cela veut dire qu’ils aiment les fonctionnalités sympas dont ils profitent déjà à la maison, mais savent être productifs rapidement avec le nouveau système.

Pour cela le menu **démarrer** ne devrait **pas les surprendre** par rapport à Windows 7, mais il vient **s’enrichir** des **applications universelles**(UWP) qui sont les mêmes qu’ils utilisent sur leurs téléphones.

Afin de remplacer votre navigateur préféré (Internet Explorer), Windows 10 apporte **Edge**(ex projet Spartan) qui apporte des technologies de rendu HTML avancés ainsi que des expériences utilisateurs modernes (écrire/commenter directement une page Web, un mode lecture qui traduit automatiquement dans votre langue, ainsi que d’autres perles qui restent à annoncer).

Notons qu’**Internet Explorer** reste disponible et sera utilisable notamment pour des raisons de compatibilité avec les applications métiers (notamment avec son mode **IE Entreprise**).

Dans un article ultérieur, nous parlerons aussi de nouveautés comme la gestion du store en entreprise qui est aussi très prometteuse.

## 7\. Le résumé en vidéo

[Watch on Channel 9 (archived)](https://channel9.msdn.com/series/MVA/Windows-10-pour-lentreprise)

Voilà ce que j’ai noté pour vous, il y a plein d’autres sujets que l’on couvrira dans des articles ultérieurs.

Mais en fait, le mieux, c’est de l’installer !

Nous discutons du sujet également avec Pascal dans le podcast ITCast : [http://itcast.cloudapp.net/?name=2015-05-07\_episode-12.mp3](http://itcast.cloudapp.net/?name=2015-05-07_episode-12.mp3)

Téléchargez le livre Microsoft Press : Introducing Windows 10 for IT Professionals, Preview Edition [https://t.co/fHpuAuNYO7](https://t.co/fHpuAuNYO7)

Si vous voulez en savoir plus et venir découvrir Windows 10, inscrivez-vous au TechDays Tour, il y a une date près de chez vous ! [Par-ici](https://techdays.microsoft.fr/camp/default.aspx)

<template lang="pug">
  .container
    h2 Incidents survenus sur la plateforme API Entreprise

    .panel
      .panel__header
        h3 MSA
        small.panel__header-extra vendredi 6 avril à aujourd'hui

      p Le service de la MSA est injoinable.
      p Aucune réponse à nos demandes d'informations sur la raison de cette indisponibilité ainsi que sur le délai de rétablissement ne nous a été fournie jusqu'ici.

    br
    .panel
      .panel__header
        h3 Exercices
        small.panel__header-extra mardi 20 février à aujourd'hui

      p Environ 15% des appels renvoient un code 206 avec un body vide. Les services de la DGFiP sont en train d'investiguer sur les causes de ces réponses incomplètes.

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra mardi 25 avril de 14h30 à 17h30

      p Les services suivants de l'INSEE ont été indisponibles :

      ul
        li etablissements_legacy
        li entreprises_legacy
        li etablissements_precedesseur
        li etablissements_successeur

    br
    .panel
      .panel__header
        h3 Associations
        small.panel__header-extra jeudi 25 janvier, 21h00 au 7 février, 12h

      p
        i Jeudi 25 janvier 20h :
        |  fermeture inopinée de l'API du service SIVA.jeunesse-sports.gouv.fr, fournisseur des données Associations d'API Entreprise<br>
        i Vendredi 26 janvier 11h38 :
        |  mail de la DSI Jeunesse et Sports informant l'équipe API Entreprise de la fermeture du service et de l'ouverture imminente d'une nouvelle API en remplacement<br>
        i Lundi 29 janvier 19h30 :
        |  disponibilité effective de la nouvelle API sur le service  SIVA.jeunesse-sports.gouv.fr<br>
        i Mardi 30 janvier 10h30 :
        |  l'équipe API Entreprise constate une régression sur la nouvelle API du service SIVA.jeunesse-sports.gouv.fr (PDF inaccessibles)<br>
        i Jeudi 1 février 14h :
        |  l'endpoint associations est de nouveau opérationel, cependant les PDF restent inaccessibles.<br>
        i Lundi 5 février 14h :
        |  les équipes techniques du service SIVA ont livré un correctif pour les PDF sur leur plateforme interne de tests. La mise en production est prévue pour Jeudi 8 février<br>
        i Mercredi 7 février matinée :
        |  Mise en production du correctif côté SIVA, retour à la normale.

      ul
        li v1/associations
        li v2/associations
        li v2/documents_associations

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra vendredi 1er décembre, 21h00 au 4 décembre, 14h

      p Indisponibilité de l'INSEE
      ul
        li v1/etablissements
        li v1/entreprises
        li v1/entreprises_legacy
        li v1/etablissements_legacy

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra vendredi 24 novembre, 9h00 au lundi 27 novembre, 13h40

      p Indisponibilité de l'INSEE
      ul
        li v1/etablissements
        li v1/entreprises
        li v1/entreprises_legacy
        li v1/etablissements_legacy

    br
    .panel
      .panel__header
        h3 API Entreprise
        small.panel__header-extra jeudi 9 novembre, 7h33 aux environs de 11h00

      p L'ensemble du service API Entreprise était indisponible à la suite d'un incident chez notre hébergeur OVH. Deux incidents simultanés ont eu lieu sur deux sites différents, Strasbourg et Roubaix, sites où sont hébergés les serveurs de production d'API Entreprise. Le compte rendu de l'incident OVH est disponible
        a(href="https://www.ovh.com/fr/news/cp2555.point_suite_aux_deux_incidents_du_9_novembre_2017")  ici

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra mercredi 25 octobre, 10h13 à 10h41 et de 11h38 à 15h56

      ul
        li v2/etablissements
        li v2/entreprises
        li /v2/etablissements/:siret/predecesseur
        li /v2/etablissements/:siret/successeur

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra mercredi 18 octobre, 10h43 à 15h55

      ul
        li v2/etablissements
        li v2/entreprises
        li /v2/etablissements/:siret/predecesseur
        li /v2/etablissements/:siret/successeur

    br
    .panel
      .panel__header
        h3 DGFIP
        small.panel__header-extra mardi 17 octobre, 18h50 - lundi 23 octobre, 8h13

      ul
        li Attestations fiscales v1 et v2
        li Exercices v1 et v2

    br
    .panel
      .panel__header
        h3 INSEE
        small.panel__header-extra samedi 14 octobre, 7h30 - mardi 17 octobre, 9h56

      ul
        li v1/etablissements
        li v1/entreprises

    br
    .panel
      .panel__header
        h3 Qualibat
        small.panel__header-extra vendredi 13 octobre, 18h50 - vendredi 20 octobre, 10h12

      ul
        li v1/certificats_qualibat
        li v2/certificats_qualibat

    br
</template>

<script>
  export default {
    name: 'incidents-view'
  }
</script>

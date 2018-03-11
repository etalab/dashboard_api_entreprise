<template>
  <div>
    <h1>Incidents survenus sur la plateforme API Entreprise</h1>

    <div class="ui segment">
      <h2>Exercices : mardi 20 février à aujourd'hui</h2>

      <p>
        Environ 15% des appels renvoient un code 206 avec un body vide. Les services de la DGFiP sont en train d'investiguer sur les causes de ces réponses incomplètes.
      </p>
    </div>

    <div class="ui segment">
      <h2>Associations : jeudi 25 janvier, 21h00 au 7 février, 12h</h2>
      <p>
        Jeudi 25 janvier 20h : fermeture inopinée de l'API du service SIVA.jeunesse-sports.gouv.fr, fournisseur des données Associations d'API Entreprise<br>
        Vendredi 26 janvier 11h38 : mail de la DSI Jeunesse et Sports informant l'équipe API Entreprise de la fermeture du service et de l'ouverture imminente d'une nouvelle API en remplacement<br>
        Lundi 29 janvier 19h30 : disponibilité effective de la nouvelle API sur le service  SIVA.jeunesse-sports.gouv.fr<br>
        Mardi 30 janvier 10h30 : l'équipe API Entreprise constate une régression sur la nouvelle API du service SIVA.jeunesse-sports.gouv.fr (PDF inaccessibles)<br>
        Jeudi 1 février 14h : l'endpoint associations est de nouveau opérationel, cependant les PDF restent inaccessibles.<br>
        Lundi 5 février 14h : les équipes techniques du service SIVA ont livré un correctif pour les PDF sur leur plateforme interne de tests. La mise en production est prévue pour Jeudi 8 février<br>
        Mercredi 7 févier matinée : Mise en production du correctif côté SIVA, retour à la normale.
      </p>
      <ul>
        <li>v1/associations</li>
        <li>v2/associations</li>
        <li>v2/documents_associations</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>INSEE : vendredi 1er décembre, 21h00 au 4 décembre, 14h</h2>
      <p>Indisponibilité de l'INSEE</p>
      <ul>
        <li>v1/etablissements</li>
        <li>v1/entreprises</li>
        <li>v1/entreprises_legacy</li>
        <li>v1/etablissements_legacy</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>INSEE : vendredi 24 novembre, 9h00 au lundi 27 novembre, 13h40</h2>
      <p>Indisponibilité de l'INSEE</p>
      <ul>
        <li>v1/etablissements</li>
        <li>v1/entreprises</li>
        <li>v1/entreprises_legacy</li>
        <li>v1/etablissements_legacy</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>API Entreprise : jeudi 9 novembre, 7h23 aux environs de 11h00</h2>
      <p> L'ensemble du service API Entreprise était indisponible à la suite d'un incident chez notre hébergeur OVH. Deux incidents simultanés ont eu lieu sur deux sites différents, Strasbourg et Roubaix, sites où sont hébergés les serveurs de production d'API Entreprise. Le compte rendu de l'incident OVH est disponible <a target="_blank" href="https://www.ovh.com/fr/news/cp2555.point_suite_aux_deux_incidents_du_9_novembre_2017#xtor=ES-8-[sla-rbx]-20171120-[link]">ici</a></p>
    </div>

    <div class="ui segment">
      <h2>INSEE : mercredi 25 octobre, 10h13 à 10h41 et de 11h28 à 15h56</h2>
      <ul>
        <li>v2/etablissements</li>
        <li>v2/entreprises</li>
        <li>/v2/etablissements/:siret/predecesseur</li>
        <li>/v2/etablissements/:siret/successeur</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>INSEE : mercredi 18 octobre, 10h43 à 15h55</h2>
      <ul>
        <li>v2/etablissements</li>
        <li>v2/entreprises</li>
        <li>/v2/etablissements/:siret/predecesseur</li>
        <li>/v2/etablissements/:siret/successeur</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>DGFIP : mardi 17 octobre, 18h50 - lundi 23 octobre, 8h13</h2>
      <ul>
        <li>Attestations fiscales v1 et v2</li>
        <li>Exercices v1 et v2</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>INSEE : samedi 14 octobre, 7h30 - mardi 17 octobre, 9h56</h2>
      <ul>
        <li>v1/etablissements</li>
        <li>v1/entreprises</li>
      </ul>
    </div>

    <div class="ui segment">
      <h2>Qualibat : vendredi 13 octobre, 18h50 - vendredi 20 octobre, 10h12</h2>
    </div>

    <br>
  </div>
</template>

<script>
  export default {
    name: 'incidents-view'
  }
</script>

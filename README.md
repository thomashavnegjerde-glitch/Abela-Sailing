# Abela Sailing

Personlig reiseblogg for familie og venner. Åpen lesing, ingen leserkonto. Selvstendig prosjekt; Lys langs veien er kun designreferanse.

## Status

Første kildekodeversjon med forside, reisedagbok, søk, innlegg med bildevisning, reisekart og om oss. Eksempelinnhold og illustrasjoner er tydelig merket. Ingen faktiske opplysninger om reisen er lagt inn.

**Ikke ferdig til full bruk:** GitHub-innlogging til Decap må kobles til og testes. Kommentarer er deaktivert inntil en etablert tjeneste med moderering, spambeskyttelse og kontrollerte gratisvilkår er valgt. Ingen betalte tjenester er opprettet. Ingen påstand om gjennomført ekstern sikkerhetsrevisjon.

## Vercel

1. Importer `thomashavnegjerde-glitch/Abela-Sailing` i Vercel på din personlige Hobby-konto.
2. Velg `Other` som rammeverk. Byggekommando: `npm run build`. Output: `dist`. Installer med `npm ci`.
3. Publiser med gratis Vercel-adresse. Ikke kjøp domene eller aktiver betalte tillegg.
4. Kontroller alle sidene på mobil og datamaskin før du deler lenken.

`vercel.json` inneholder byggeinnstillinger og sikkerhetsheadere. Bloggen ber søkemotorer om ikke å indeksere; dette er **ikke tilgangsbeskyttelse**. Alt publisert er offentlig.

## Bilder og personvern

Legg bilder i `uploads/`, med JPEG, PNG, WebP eller AVIF-format, maksimalt 20 MB per bilde. Referer til dem med `/uploads/filnavn.jpg` i innholdet.

Byggingen roterer bilder korrekt, begrenser til 1920 px og lager WebP-kopier uten EXIF/GPS-data. Bare behandlede, brukte bilder publiseres i `dist/media/`. Originaler i `uploads/` kopieres ikke til nettsiden.

**Viktig:** I et offentlig GitHub-repository er kildefiler, originalbilder og lagrede utkast fortsatt offentlige, også via Git-historikken. Fjern sensitive metadata før opplasting eller bruk et privat repository. Git-historikk er ikke en trygg måte å lagre private originaler på. Ta vare på originaler separat.

## Redigeringsverktøy

`admin/config.yml` er klargjort for Decap CMS med GitHub-backend. `/admin/` viser status; `admin/editor.html` i kildekoden er for oppsett og testing. I publisert utgave erstattes den med statussiden, slik at CMS ikke åpnes før en kontrollert innlogging er aktivert. Uten OAuth-kobling kan det ikke publisere. Ikke legg passord, personlige tilgangstokener eller klienthemmeligheter i disse filene.

Neste steg er å velge en etablert OAuth-løsning som støtter Vercel, kontrollere pris og vedlikehold og sette opp GitHub-innlogging. Hemmeligheter skal ligge som servermiljøvariabler. Kontroller callback-adresse, CSRF-state, origin-kontroll og tillatelser. Aktiver tofaktor på GitHub. Ikke åpne for andre skribenter uten behov. Tilpass CSP hvis valgt innlogging krever andre domener; ikke åpne den generelt.

Når innlogging fungerer:
1. Åpne redigering og velg «Innlegg, rute og sider».
2. Legg til et reiseinnlegg med unik adresse, tittel, tekst, dato og bilder.
3. La «Vis på bloggen» være av mens du skriver; slå på når det skal publiseres.
4. Lagre. GitHub-endringen utløser ny bygging i Vercel; kontroller at byggingen er vellykket.
5. Oppdater reisestatus og kartstopp i samme skjema.

Automatisk lokal utkastlagring og gjenoppretting etter brutt internett er **ikke verifisert**. Skriv lange tekster i en notatapp hvis forbindelsen er ustabil. «Lagre» i CMS og publisering på nettsiden er to ulike steg, siden Vercel må bygge først.

## Kart

Kartbibliotek og OpenStreetMap-kart lastes først etter et aktivt trykk. Ingen kartleverandør kontaktes når stopp-listen er tom. Leaflet-versjonen er låst og integritetssjekket. Stopp oppdateres manuelt. Linjer er forbindelser mellom stopp, ikke navigasjonsdata. Følg OpenStreetMaps bruksvilkår ved økt trafikk; ikke forhåndslast/offline-lagre kartfliser.

## Kommentarer

Ikke aktivert. Bruk en etablert moderert tjeneste etter vurdering av gratisgrenser, innlogging for besøkende, personvern og spam. Ikke bygg et åpent skriveendepunkt uten servervalidering, hastighetsbegrensning og moderering. Kommentarfeltet viser ærlig status, uten et skjema som later som meldinger lagres.

## Eksport og vedlikehold

Last ned repositoryet eller klon det for kopi av tekster, kartstopp og bilder. Ta også kopi av originalbildene separat. Ved flytting kan JSON-innholdet konverteres til et annet publiseringssystem. Git-historikken gir versjonshistorikk, men erstatter ikke en separat sikkerhetskopi.

Følg med på Vercels gratisgrenser, sikkerhetsoppdateringer for Sharp og Decap, og oppdater låste versjoner etter kontroll. Ingen analyseverktøy eller reklametjenester er lagt inn. Hosting og GitHub kan likevel behandle tekniske logger. Oppdater personvernsiden når kommentarer eller innlogging aktiveres.

## Lokal kontroll

Krever Node.js 22 eller nyere.

```sh
npm ci
npm run check
npm test
npm run build
python3 -m http.server 8080 --directory dist
```

Åpne `http://localhost:8080`. CMS-innlogging og CSP i produksjon må testes etter kobling til Vercel.

## Designoppdatering 14. oktober 2026

Fullbredde toppbilde, klassisk typografi, Reisebrev/Kart/Båten/Om oss og redaksjonell forside. Solnedgangsbildet er en tydelig merket AI-illustrasjon, ikke et faktisk bilde fra reisen. Bildet av Abela vises i siste-reisebrev-seksjonen og på båtsiden; fotografens vannmerke er bevart. Kartoversikten viser ingen oppdiktet rute. Bygging, innholdstester og interne lenker er kontrollert. Mobilvisning og produksjonsvisning må kontrolleres i nettleser etter publisering.

## Demo med reisebrev og bilder

Fire eksempelinnlegg, illustrerende AI-bilder og fire eksempelstopp er lagt inn for å vise designets potensial. All reiseinformasjon er merket som eksempel. Dette er ikke faktiske turdata. Erstatt innlegg og rute med egne opplevelser før bloggen brukes som en reiseskildring. Behold eksempelmerking så lenge demoopplysninger finnes. Kommentarer og redigeringsinnlogging er fremdeles ikke aktivert.

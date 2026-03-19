# Ruokaostokset

Yksinkertainen ja tyylikäs selainsovellus viikon ruokaostosten ylläpitoon.

## Ominaisuudet
- **Lisää ja poista tuotteita:** Helppo käyttöliittymä ostosten hallintaan.
- **Yliviivaa ostetut:** Merkitse tuotteet ostetuiksi yhdellä klikkauksella.
- **Tumma teema:** Tukee sekä vaaleaa että tummaa tilaa (Dark Mode).
- **Jaa lista:** Pakkaa ostoslistan URL-osoitteeseen, jolloin voit jakaa sen helposti muille ilman tietokantaa.
- **Paikallinen tallennus:** Lista pysyy tallessa selaimesi muistissa.

## Kehitys

Asenna riippuvuudet ja käynnistä kehityspalvelin:

```bash
npm install
npm run dev
```

## Julkaisu (GitHub Pages)

Tämä repositorio sisältää valmiin GitHub Actions -työnkulun (`.github/workflows/deploy.yml`), joka julkaisee sovelluksen automaattisesti GitHub Pagesiin.

### Ohjeet GitHub Desktop -käyttäjille:

1. **Lataa koodi:** Lataa tämä projekti AI Studiosta ZIP-tiedostona (oikean yläkulman valikosta) ja pura se haluamaasi kansioon tietokoneellasi.
2. **Lisää GitHub Desktopiin:**
   - Avaa GitHub Desktop.
   - Valitse ylävalikosta **File** > **Add Local Repository...**
   - Etsi ja valitse äsken purkamasi kansio.
   - GitHub Desktop huomaa, ettei kansio ole vielä Git-repositorio. Klikkaa sinistä **create a repository** -linkkiä.
   - Anna repositoriolle nimi (esim. `ruokaostokset`) ja klikkaa **Create repository**.
3. **Julkaise GitHubiin:**
   - Klikkaa yläpalkista sinistä **Publish repository** -painiketta.
   - Ota rasti pois kohdasta "Keep this code private", jotta GitHub Pages toimii ilmaisella tilillä.
   - Klikkaa **Publish repository**.
4. **Ota GitHub Pages käyttöön:**
   - Mene selaimella juuri luomasi repositorion sivulle GitHubissa (voit painaa GitHub Desktopissa `Ctrl+Shift+G` tai `Cmd+Shift+G`).
   - Mene repositorion asetuksiin: **Settings** > **Pages** (vasemmassa sivupalkissa).
   - Varmista, että "Build and deployment" -kohdassa "Source" on asetettu arvoon **GitHub Actions**.
   
Tämän jälkeen GitHub Actions rakentaa ja julkaisee sovelluksen automaattisesti. Näet julkaisun edistymisen repositoriosi **Actions**-välilehdeltä. Kun työnkulku on valmis, sovelluksesi löytyy osoitteesta `https://<käyttäjänimesi>.github.io/<repon-nimi>/`.

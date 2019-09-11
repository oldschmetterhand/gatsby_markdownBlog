---
path: "/blog/my-third-post"
date: "2019-07-04"
title: "My third blog post"
author: "Gustav Gans"
featuredImage: ../../images/cat_unsplash_.jpg
summary: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd"
---


# Aufwandsschätzung

## Vorbemerkung: 

### Ergebnis:
- Erwartbare Codelänge der Gesamtapplikation: 2000-2500 LOC.
- ca. 8 Personenmonate Entwicklungskapazität.
- Nach Projektabschluss: Wartungsaufwand von 2 Personenmonaten jährlich. 


### Zusammenfassung:

- Bei 10 Personenmonaten Entwicklungskapazität sind unter Einsatz gegebener Mittel __maximal 3000 Codezeilen umsetzbar__.
- Die als Probe ermittelte durchschnittlich zu erwartende Projektdauer von ca. 37 Monaten stimmt mit der tatsächlichen 
  verbleibenden Projektdauer von ca. 44 Monaten __weitgehend überein__.
- Die Aufwandsberechnung durch das Constructive Cost Model ergibt einen zu erwartenden __Gesamtaufwand von 9.8 Personenmonaten__, 
  (bei 7.5 Konstruktionszeit) und __stimmt mit dem intial kalkulierten Schätzwert von 10 Personenmonaten weitgehend überein__. 

- Nach Projektabschluss ist mit einem __jährlichem Wartungsaufwand von zwei Personenmonaten__, bei einem Entwickler in Halbzeitbeschäftigung zu rechnen.
- Für die __Publikationstätigkeit__ sind __2 Personenmonate__ (Vollzeit) im Rahmen des Gesamtprojektes einzuplanen. 


### Quantitative Methode zu Erfassung des Projektaufwandes

Der Aufwand der Projektes wird gemäß eines dreiteiligen Verfahrens ermittelt.
Dieses besteht aus:
- 1. Berechnung  der KLOC auf Basis von Oliver Hummel, Aufwandsschätzungen in der Software- und Systementwicklung kompakt, 2011, insbesondere S. 117-121 (auch Verwendung zuvor ermittelter Schätzwerte).
- 2. Verwendung des COCOMO-Rechners basierend auf SLOC. https://csse.usc.edu/tools/COCOMOII.php
- 3. Kalkulation des domänenspezifischen Entwicklungsaufwandes für die Digitalen Geisteswissenschaften unter den Aspekten der Digitalen Langzeitarchivierung. Dazu Errechnung des Wartungsauwandes nach Hummel. 


### Geläufige Parameter:

- Ein durchschnittlicher __Entwickler kann pro Monat ungefähr 300–500 Zeilen Code__ umsetzen. 
- im Schnitt __verändern sich 35% aller Anforderungen__.
- Pareto-Prinzip: __20% Software sorgt für 80% der Funktionalität__.


## 1. Berechung des Projektaufwandes nach Oliver Hummel:

### Berechnung der KLOC (laut Hummel):

Ermittlung des Entwicklungsaufwandes in KLOC. 

```
Aufwand (in Personenmonaten) = 3 * KLOC^(1.1)

```

umgeformt zu

```
KLOC = (Aufwand / 3)^(1/1.1)

```

Eingesetzte Werte:
- Aufwand (Personenmonat) = 10 Monate (20 Monate bei halber Anstellung)

resultiert in:
KLOC = 2.98775040... ~ 3 Tausend Zeilen Code für die gesamte Applikation.

Resultat:
In den 20 verbleibenden Monaten der Projektumsetzung (bei halber Anstellung) können 
__maximal 3000 Codezeilen__ umgesetzt werden.


==========================

### Kalkulation auf Basis der Entwicklungszeit für das Gesamtprojekt: 


Im Durchschnitt zu erwartende Projektdauer in Monaten: 

```
Entwicklungszeit = 3 * Aufwand^(1/3)

```

umgeformt zu:

```
Aufwand (in Monaten) = (Entwicklungszeit/3)^(1/(1/3))

```

Eingesetzte Werte:
- Entwicklungszeit = 10 Personenmonate.

resultiert in:
Aufwand =  37.03703... ~ im Durchschnitt 37 Monate verbleibende Projektdauer.

Resultat:
Bei 10 Personenmonaten Entwicklungskapazität ergibt sich eine durchschnittlich zu erwartende
Projektdauer von 37 Monaten.


## 2. Kalkulation auf Basis des Constructice Cost Model:

### Kalkulation unter SLOC = 3000.
- ergibt einen Aufwand von __9.8 Personenmonaten__.


## 3. Kalkulation des domänenspezifischen Entwicklungsaufwandes für die Digitalen Geisteswissenschaften:

- Hummel geht von einem jährlichen Anteil von __10% an der Gesamtarbeitszeit__ eines Entwicklers in Vollzeit für Wartung aus. Damit ist mit einem Aufwand von __20% für einen Entwickler in Halbzeitanstellung__ zu rechnen. 
- Ein Viertel der Gesamtentwicklungszeit soll für Publikationstätigkeit eingeplant werden.


```
Jährlicher-Wartungsaufwand = Jährliche-Änderungsrate * Aufwand (Personenmonate)

```

Eingesetzte Werte: 
Jährliche-Änderungsrate = 20%
Aufwand = 10 Personenmonate

resultiert in:
Jährlicher Wartungsaufwand =  2 Personenmonate

Resultat:
Bei einer mit __10 Personenmonaten entwickelten Applikation__ entsteht ein __jährlicher Wartungsaufwand von 2 Personenmonaten__.


# Zusammenfassung:

- Bei 10 Personenmonaten Entwicklungskapazität sind unter Einsatz gegebener Mittel __maximal 3000 Codezeilen umsetzbar__.
- Die als Probe ermittelte durchschnittlich zu erwartende Projektdauer von ca. 37 Monaten stimmt mit der tatsächlichen 
  verbleibenden Projektdauer von ca. 44 Monaten __weitgehend überein__.
- Die Aufwandsberechnung durch das Constructive Cost Model ergibt einen zu erwartenden __Gesamtaufwand von 9.8 Personenmonaten__, 
  (bei 7.5 Konstruktionszeit) und __stimmt mit dem intial kalkulierten Schätzwert von 10 Personenmonaten weitgehend überein__. 

- Nach Projektabschluss ist mit einem __jährlichem Wartungsaufwand von zwei Personenmonaten__, bei einem Entwickler in Halbzeitbeschäftigung zu rechnen.
- Für die __Publikationstätigkeit__ sind __2 Personenmonate__ im Rahmen des Gesamtprojektes einzuplanen. 



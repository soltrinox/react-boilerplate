# Best Practices

## Repository

- .gitignore
  - **/config/:** files di configurazione deploy manager (_Capistrano_);
  - **/js/\*:** files di sviluppo Front-End (_JavaScript_);
  - **/lib/:** registri operativi deploy manager (_Capistrano_); \* **/log/:** files di configurazione deploy manager (_Capistrano_);
  - **/node_modules/:** pacchetti Full-Stack Front-End (_NodeJS_);
  - **/SASS/:** files di sviluppo Front-End (_SASS_);
  - **/\_.browserslistrc/:** file di configurazione _NodeJS_;
  - **/.:** files di sistema e di configurazione vari;
  - **/!.htaccess:** file di configurazione Host;
  - **/.json:** files di configurazione vari Full-Stack Front-End;
  - **/Capfile:** file di configurazione deploy manager (_Capistrano_);
  - **/config.rb:** file di configurazione Framework Front-End (_Compass_);
  - **/Gemfile:** file di configurazione _Ruby_;
  - **/Gemfile.lock:** file di configurazione _Ruby_; \* **/gulpfile.js:** file di configurazione task-runner Front-End (_Gulp_);
  - **/postcss.config.js:** file di configurazione plugin bundler moduli (_Webpack_);
    _ \_\_/webpack._.js\__: file di configurazione bundler moduli (\_Webpack_);

Es.

```
	# Generale
	/config/
    /js/*
    !/js/*/
    /lib/
    /log/
    /node_modules/
    /sass/
    /_.browserlistrc
    /.*
    !/.htaccess
    /*.json
    /Capfile
    /config.rb
    /Gemfile
    /Gemfile.lock
    /gulpfile.js
    /postcss.config.js
    /webpack.*.js
```

## Branches

- **develop** (Sviluppo);
- **staging** (Beta);
- **master** (Produzione - _Default_);

## Commits

- **< Etichetta/Titolo >**

  - -**< Descrizione >**;

- **Etichetta**: label identificativa oggetto dell'implementazione (se prevista);
- **Titolo**: breve nomenclatura distintiva dell'oggetto dell'implementazione
- **Descrizione**: breve nota illustrativa dell'implementazione effettuata;

Es.

```
	Updates template

	- Aggiornate icone;
```

## Merges

- **staging**: merging da **develop**;
- **master**: merging da **staging**;

## Deployment

### Capistrano

#### CLI

- **Beta**
  - `cap staging deploy`
- **Produzione** \* `cap production deploy`

## Host

### Directories essenziali ^!

- **.ssh**
- **releases**
- **repo**
- **shared**
- **current**

### Files essenziali^!

- **.ftpquota**
- **revisions.log**

^! **Non eliminare**

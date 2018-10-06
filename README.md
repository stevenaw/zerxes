# Zerxes

Zerxes is a CLI tool that helps with automation testing of HTTP redirects.

## Usage

From any directory, you can run:

```sh
$ npx @zerxes [args]
```

## Options

You can specify options through the command line (CLI).

| CLI       | Description                       | Default Value | Example                    |
| --------- | --------------------------------- | ------------- |--------------------------- |
| `in`      | Input file with valid test cases  | &nbsp;        | `--in=./test-cases.xlsx`   |
| `out`     | Output file with test results     | &nbsp;        | `--out=./output.xlsx`      |
| `maxHops` | Maximum HTTP hops before failure  | 10            | `--maxHops=10`             |

## Input Formats

Zerxes currently currently only supports CSV and XLSX files for input.

### XLSX

When receiving an XLSX file as input, the input file should be structured as follows (without headers):

- Column 1: The URL to start from (ex: `http://google.com`)
- Column 2: The expected URL to be redirected to (ex: `http://www.google.com`)
- Column 3: The maximum hop count for the redirect (ex: `2`). Optional, leave blank to use default value.

#### Example:

|  &nbsp;              | &nbsp;                  | &nbsp;  |
| -------------------- | ----------------------- | ------- |
| `http://google.com`  | `http://www.google.com` |         |
| `http://yahoo.com`   | `https://www.yahoo.com` | `5`     |

### CSV

When receiving an CSV file as input, the input file should be structured as follows (without headers):

- Column 1: The URL to start from (ex: `http://google.com`)
- Column 2: The expected URL to be redirected to (ex: `http://www.google.com`)
- Column 3: The maximum hop count for the redirect (ex: `2`). Optional, leave blank to use default value.

#### Example:

```csv
http://www.google.com,http://www.google.com
http://www.yahoo.com,https://www.yahoo.com,5
```

## Output Formats

Zerxes currently currently only supports CSV and XLSX files for output. Both formats will display the following table:

|  maxHops | url                 | expectedRedirect        | success | hops |
| -------- | ------------------- | ----------------------- | ------- | ---- |
| `10`     | `http://google.com` | `http://www.google.com` | TRUE    | `1`  |
| `5`      | `http://yahoo.com`  | `https://www.yahoo.com` | TRUE    | `1`  |

## Examples

Call from CLI:
```cli
npx zerxes --in=./test/data/test.csv --out=./output.csv --maxHops=5
```

```cli
node index.js --in=./test/data/test.csv --out=./output.csv --maxHops=5
```
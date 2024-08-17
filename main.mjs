import {styleText} from "node:util"
import Seafret from 'seafret';

const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

function format(x) {
  let l = 0,
    n = parseInt(x, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

const cli = new Seafret('0.0.1');
cli
.option('repo', 'Didnt find repository to fetch (should be --repo webpack/webpack-cli)')
.send(process.argv)

if(!cli.repo) throw new Error(`${styleText('red','Argument Error: ')} ${styleText('yellow', cli.options.repo)}`).message

const repo = process.argv.pop();
const repo_size_response = await fetch(`https://api.github.com/repos/${repo}`)
const repo_size_data = await repo_size_response.json()

console.log(styleText('gray', `Repository size for ${repo} is:`), styleText('green', format(repo_size_data.size)))
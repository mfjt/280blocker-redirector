import { expect } from 'chai'
import { beforeEach } from 'mocha'
import { handleRequest } from '../src/handler'
import * as sinon from 'sinon'

describe('handler returns response with request method', () => {
  var sandbox: sinon.SinonSandbox

  beforeEach(function () {
    sandbox = sinon.createSandbox()
    sandbox.useFakeTimers(new Date(2020, 11 - 1, 1).getTime())
  })

  afterEach(function () {
    sandbox.restore();
  })

  const URI_BASE = 'https://280blocker.net/files/'
  const FILENAME_ARRAYS = [
    ['280blocker_adblock.txt', '280blocker_adblock_202011.txt'],
    ['280blocker_1blocker.1blockpkg', '280blocker_1blocker_202011.1blockpkg'],
    ['280blocker_adblock', '280blocker_adblock_202011'],
  ]

  FILENAME_ARRAYS.forEach((filename) => {
    it('/' + filename[0], async () => {
      let response = await handleRequest(new Request('/' + filename[0]))
      let status = response.status
      let location = response.headers.get('location')
      expect(status).equal(303)
      expect(location).equal(URI_BASE + filename[1])
    })
  })

  it('/', async () => {
    let response = await handleRequest(new Request('/'))
    let status = response.status
    expect(status).equal(400)
  })
})

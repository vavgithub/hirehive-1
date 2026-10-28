import assert from 'node:assert/strict'
import test from 'node:test'
import {
  PERMISSIONS,
  ROLES,
  getRoute,
  hasPermission,
  hasRoutePermission,
} from '../src/config/permissions.config.js'

test('a missing role or permission is denied', () => {
  assert.equal(hasPermission(undefined, PERMISSIONS.SHOW_KEBAB), false)
  assert.equal(hasPermission(ROLES.ADMIN, undefined), false)
  assert.equal(hasRoutePermission('', 'dashboard'), false)
})

test('staff menu actions stay off the candidate role', () => {
  assert.equal(hasPermission(ROLES.ADMIN, PERMISSIONS.SHOW_KEBAB), true)
  assert.equal(hasPermission(ROLES.HIRING_MANAGER, PERMISSIONS.SHOW_KEBAB), true)
  assert.equal(hasPermission(ROLES.CANDIDATE, PERMISSIONS.SHOW_KEBAB), false)
  assert.equal(hasPermission(ROLES.DESIGN_REVIEWER, PERMISSIONS.SHOW_KEBAB), false)
})

test('route lookup follows the role map', () => {
  assert.equal(
    getRoute(ROLES.DESIGN_REVIEWER, 'dashboard'),
    '/design-reviewer/dashboard'
  )
  assert.equal(hasRoutePermission(ROLES.CANDIDATE, 'dashboard'), false)
  assert.equal(getRoute(ROLES.CANDIDATE, 'dashboard'), undefined)
})

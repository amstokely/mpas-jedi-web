import { renderHook, act } from '@testing-library/react'
import { useNavbarLinkState, LinkType } from './useNavbarLinkState'

const mockLinks: LinkType[] = [
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Events', href: '/events' },
]

describe('useActiveNavbarLinks', () => {
  it('initializes with all links inactive', () => {
    const { result } = renderHook(() => useNavbarLinkState(mockLinks))

    result.current.links.forEach(link => {
      expect(link.isActive).toBeFalsy()
    })
  })

  it('activates a link by label', () => {
    const { result } = renderHook(() => useNavbarLinkState(mockLinks))

    act(() => {
      result.current.handleLinkClick('Team')
    })

    expect(result.current.links).toEqual([
      { label: 'About', href: '/about', isActive: false },
      { label: 'Team', href: '/team', isActive: true },
      { label: 'Events', href: '/events', isActive: false },
    ])
  })

  it('only allows one link to be active at a time', () => {
    const { result } = renderHook(() => useNavbarLinkState(mockLinks))

    act(() => {
      result.current.handleLinkClick('Events')
    })

    act(() => {
      result.current.handleLinkClick('About')
    })

    expect(result.current.links.find(link => link.label === 'About')?.isActive).toBe(true)
    expect(result.current.links.find(link => link.label === 'Events')?.isActive).toBe(false)
  })

  it('resets all links to inactive', () => {
    const { result } = renderHook(() => useNavbarLinkState(mockLinks))

    act(() => {
      result.current.handleLinkClick('About')
    })

    act(() => {
      result.current.resetLinks()
    })

    result.current.links.forEach(link => {
      expect(link.isActive).toBe(false)
    })
  })
})

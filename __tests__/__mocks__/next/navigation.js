module.exports = {
    useRouter: jest.fn(() => ({
        push: path => window.history.pushState({}, '', path),
    })),
    usePathname: jest.fn(() => window.location.pathname),
    useSearchParams: jest.fn(() => new URLSearchParams(window.location.search)),
}

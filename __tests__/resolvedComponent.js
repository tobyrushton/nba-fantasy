const resolvedComponent = async (Component, props = {}) => {
    const ComponentResolved = await Component(props)
    return () => ComponentResolved
}

module.exports = resolvedComponent

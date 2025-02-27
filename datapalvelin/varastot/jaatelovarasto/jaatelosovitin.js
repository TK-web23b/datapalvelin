function munna(munnettavaolio) {
    if (!munnettavaolio) return {};

    return Object.assign(munnettavaolio, {
        id: munnettavaolio.id,
        hinta: Number(munnettavaolio.hinta),
    });
}

export { munna };

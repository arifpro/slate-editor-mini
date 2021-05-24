const BlockCount = (options) => {
    const blockLimit = options.blockLimit || 'unlimited';
    let blockCount = 0;

    return {
        blockLimit,
        blockCount,
        checkLimitCrossed() {
            return blockLimit < blockCount;
        },
        renderEditor({ value }, editor, next) {
            const children = next();
            console.log('Blocks length', value.document.getBlocks());
            blockCount = value.document.getBlocks().size;
            return (
                <div>
                    <div>{children}</div>
                    <div
                        style={{
                            marginTop: '10px',
                            padding: '12px',
                            backgroundColor: '#ebebeb',
                            display: 'block',
                        }}
                    >
                        Top level Blocks: {blockCount} <br /> Limit: {blockLimit}
                    </div>
                </div>
            );
        },
    };
};

export default BlockCount;

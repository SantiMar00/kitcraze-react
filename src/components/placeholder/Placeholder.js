import React from 'react'
import ContentLoader from 'react-content-loader'

const Placeholder = (props) => {
    // Get values from props
    // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;

    // Hardcoded values
    const rows = 3
    const columns = 4
    const coverHeight = 300
    const coverWidth = 300
    const padding = 5
    const speed = 1

    const coverHeightWithPadding = coverHeight + padding
    const coverWidthWithPadding = coverWidth + padding
    const initial = 35
    const covers = Array(columns * rows).fill(1)

    return (
        <ContentLoader
            speed={speed}
            width={columns * coverWidthWithPadding}
            height={rows * coverHeightWithPadding}
            primaryColor="#242b34"
            secondaryColor="#343d4c"
            {...props}
        >
            <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width={columns * coverWidthWithPadding - padding}
                height="20"
            />

            {covers.map((g, i) => {
                let vy =
                    Math.floor(i / columns) * coverHeightWithPadding + initial
                let vx =
                    (i * coverWidthWithPadding) %
                    (columns * coverWidthWithPadding)
                return (
                    <rect
                        key={i}
                        x={vx}
                        y={vy}
                        rx="0"
                        ry="0"
                        width={coverWidth}
                        height={coverHeight}
                    />
                )
            })}
        </ContentLoader>
    )
}

export default Placeholder

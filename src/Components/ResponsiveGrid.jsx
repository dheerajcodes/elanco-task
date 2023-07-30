
import { Grid, useMediaQuery,  } from '@chakra-ui/react';


const ResponsiveGrid = ({ columnCount, children }) => {
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    const [isMediumScreen] = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
    const [isSmallScreen] = useMediaQuery('(max-width: 767px)');

    let columns = 1;
    if (isLargeScreen) {
        columns = 4;
    } else if (isMediumScreen) {
        columns = 3;
    } else if (isSmallScreen) {
        columns = 1;
    } else {
        columns = columnCount;
    }

    return (
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={isSmallScreen ? 4 : 8}>
            {children}
        </Grid>
    );
};

export default ResponsiveGrid;
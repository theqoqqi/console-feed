"use strict";
exports.__esModule = true;
var Arithmetic;
(function (Arithmetic) {
    Arithmetic[Arithmetic["infinity"] = 0] = "infinity";
    Arithmetic[Arithmetic["minusInfinity"] = 1] = "minusInfinity";
    Arithmetic[Arithmetic["minusZero"] = 2] = "minusZero";
})(Arithmetic || (Arithmetic = {}));
function isMinusZero(value) {
    return 1 / value === -Infinity;
}
exports["default"] = {
    type: 'Arithmetic',
    lookup: Number,
    shouldTransform: function (type, value) {
        return (type === 'number' &&
            (value === Infinity || value === -Infinity || isMinusZero(value)));
    },
    toSerializable: function (value) {
        return value === Infinity
            ? Arithmetic.infinity
            : value === -Infinity
                ? Arithmetic.minusInfinity
                : Arithmetic.minusZero;
    },
    fromSerializable: function (data) {
        if (data === Arithmetic.infinity)
            return Infinity;
        if (data === Arithmetic.minusInfinity)
            return -Infinity;
        if (data === Arithmetic.minusZero)
            return -0;
        return data;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpdGhtZXRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFuc2Zvcm0vYXJpdGhtZXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUssVUFJSjtBQUpELFdBQUssVUFBVTtJQUNiLG1EQUFRLENBQUE7SUFDUiw2REFBYSxDQUFBO0lBQ2IscURBQVMsQ0FBQTtBQUNYLENBQUMsRUFKSSxVQUFVLEtBQVYsVUFBVSxRQUlkO0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBSztJQUN4QixPQUFPLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUE7QUFDaEMsQ0FBQztBQUVELHFCQUFlO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFDbEIsTUFBTSxFQUFFLE1BQU07SUFDZCxlQUFlLEVBQWYsVUFBZ0IsSUFBUyxFQUFFLEtBQVU7UUFDbkMsT0FBTyxDQUNMLElBQUksS0FBSyxRQUFRO1lBQ2pCLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ2xFLENBQUE7SUFDSCxDQUFDO0lBQ0QsY0FBYyxFQUFkLFVBQWUsS0FBSztRQUNsQixPQUFPLEtBQUssS0FBSyxRQUFRO1lBQ3ZCLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUNyQixDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsUUFBUTtnQkFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhO2dCQUMxQixDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsZ0JBQWdCLEVBQWhCLFVBQWlCLElBQWdCO1FBQy9CLElBQUksSUFBSSxLQUFLLFVBQVUsQ0FBQyxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUE7UUFDakQsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLGFBQWE7WUFBRSxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ3ZELElBQUksSUFBSSxLQUFLLFVBQVUsQ0FBQyxTQUFTO1lBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUU1QyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRixDQUFBIn0=
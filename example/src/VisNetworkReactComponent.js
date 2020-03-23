"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultsDeep = _interopRequireDefault(require("lodash/fp/defaultsDeep"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _differenceWith = _interopRequireDefault(require("lodash/differenceWith"));

var _visData = require("vis-data");

var _visNetwork = require("vis-network/peer/esm/vis-network");

var _uuid = _interopRequireDefault(require("uuid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("vis-network/styles/vis-network.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Graph = /*#__PURE__*/function (_Component) {
  _inherits(Graph, _Component);

  function Graph(props) {
    var _this;

    _classCallCheck(this, Graph);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Graph).call(this, props));
    var identifier = props.identifier;
    _this.updateGraph = _this.updateGraph.bind(_assertThisInitialized(_this));
    _this.state = {
      identifier: identifier !== undefined ? identifier : _uuid["default"].v4()
    };
    _this.container = _react["default"].createRef();
    return _this;
  }

  _createClass(Graph, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.edges = new _visData.DataSet(this.props.graph.edges); // this.edges.add(this.props.graph.edges);

      this.nodes = new _visData.DataSet(this.props.graph.nodes); // this.nodes.add(this.props.graph.nodes);

      this.updateGraph();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var nodesChange = !(0, _isEqual["default"])(this.props.graph.nodes, nextProps.graph.nodes);
      var edgesChange = !(0, _isEqual["default"])(this.props.graph.edges, nextProps.graph.edges);
      var optionsChange = !(0, _isEqual["default"])(this.props.options, nextProps.options);
      var eventsChange = !(0, _isEqual["default"])(this.props.events, nextProps.events);

      if (nodesChange) {
        var idIsEqual = function idIsEqual(n1, n2) {
          return n1.id === n2.id;
        };

        var nodesRemoved = (0, _differenceWith["default"])(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
        var nodesAdded = (0, _differenceWith["default"])(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual);
        var nodesChanged = (0, _differenceWith["default"])((0, _differenceWith["default"])(nextProps.graph.nodes, this.props.graph.nodes, _isEqual["default"]), nodesAdded);
        this.patchNodes({
          nodesRemoved: nodesRemoved,
          nodesAdded: nodesAdded,
          nodesChanged: nodesChanged
        });
      }

      if (edgesChange) {
        var edgesRemoved = (0, _differenceWith["default"])(this.props.graph.edges, nextProps.graph.edges, _isEqual["default"]);
        var edgesAdded = (0, _differenceWith["default"])(nextProps.graph.edges, this.props.graph.edges, _isEqual["default"]);
        var edgesChanged = (0, _differenceWith["default"])((0, _differenceWith["default"])(nextProps.graph.edges, this.props.graph.edges, _isEqual["default"]), edgesAdded);
        this.patchEdges({
          edgesRemoved: edgesRemoved,
          edgesAdded: edgesAdded,
          edgesChanged: edgesChanged
        });
      }

      if (optionsChange) {
        this.Network.setOptions(nextProps.options);
      }

      if (eventsChange) {
        var events = this.props.events || {};

        for (var _i = 0, _Object$keys = Object.keys(events); _i < _Object$keys.length; _i++) {
          var eventName = _Object$keys[_i];
          this.Network.off(eventName, events[eventName]);
        }

        events = nextProps.events || {};

        for (var _i2 = 0, _Object$keys2 = Object.keys(events); _i2 < _Object$keys2.length; _i2++) {
          var _eventName = _Object$keys2[_i2];
          this.Network.on(_eventName, events[_eventName]);
        }
      }

      return false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateGraph();
    }
  }, {
    key: "patchEdges",
    value: function patchEdges(_ref) {
      var edgesRemoved = _ref.edgesRemoved,
          edgesAdded = _ref.edgesAdded,
          edgesChanged = _ref.edgesChanged;
      this.edges.remove(edgesRemoved);
      this.edges.add(edgesAdded);
      this.edges.update(edgesChanged);
    }
  }, {
    key: "patchNodes",
    value: function patchNodes(_ref2) {
      var nodesRemoved = _ref2.nodesRemoved,
          nodesAdded = _ref2.nodesAdded,
          nodesChanged = _ref2.nodesChanged;
      this.nodes.remove(nodesRemoved);
      this.nodes.add(nodesAdded);
      this.nodes.update(nodesChanged);
    }
  }, {
    key: "updateGraph",
    value: function updateGraph() {
      var defaultOptions = {
        physics: {
          stabilization: false
        },
        autoResize: false,
        edges: {
          smooth: false,
          color: "#000000",
          width: 0.5,
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 0.5
            }
          }
        }
      }; // merge user provied options with our default ones

      var options = (0, _defaultsDeep["default"])(defaultOptions, this.props.options);
      this.Network = new _visNetwork.Network(this.container.current, Object.assign({}, this.props.graph, {
        edges: this.edges.get(),
        nodes: this.nodes.get()
      }), options);

      if (this.props.getNetwork) {
        this.props.getNetwork(this.Network);
      }

      if (this.props.getNodes) {
        this.props.getNodes(this.nodes);
      }

      if (this.props.getEdges) {
        this.props.getEdges(this.edges);
      } // Add user provied events to network


      var events = this.props.events || {};

      for (var _i3 = 0, _Object$keys3 = Object.keys(events); _i3 < _Object$keys3.length; _i3++) {
        var eventName = _Object$keys3[_i3];
        this.Network.on(eventName, events[eventName]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var identifier = this.state.identifier;
      var style = this.props.style;
      return _react["default"].createElement("div", {
        id: identifier,
        ref: this.container,
        style: style
      }, identifier);
    }
  }]);

  return Graph;
}(_react.Component);

Graph.defaultProps = {
  graph: {},
  style: {
    width: "100%",
    height: "100%"
  }
};
Graph.propTypes = {
  graph: _propTypes["default"].object,
  style: _propTypes["default"].object,
  getNetwork: _propTypes["default"].func,
  getNodes: _propTypes["default"].func,
  getEdges: _propTypes["default"].func
};
var _default = Graph;
exports["default"] = _default;
